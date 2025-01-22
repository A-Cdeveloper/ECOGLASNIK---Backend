"use server";

import {
  createJWT,
  decodeJWT,
  hashPassword,
  verifyPassword,
} from "@/app/_utils/auth";
import { sendAdminForgotPasswordEmail } from "@/app/_utils/auth/sendEmail";
import prisma from "@/app/_utils/db/db";
import {
  handleError,
  validateSchemaRedirect,
  validateSchemaResponse,
} from "@/app/_utils/errorHandler";
import {
  emailSchema,
  loginSchema,
  resetPasswordSchema,
} from "@/app/_utils/zod/authSchemas";
import { randomBytes } from "crypto";

import { cookies } from "next/headers";

type LoginUserActionResult = true | string[] | undefined;

export const getUserFromToken = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("superAdminToken")?.value;

  if (!token) {
    return null; // User is not authenticated
  }

  try {
    const { userId } = await decodeJWT(token);

    // Fetch user data from the database
    const user = await prisma.user.findUnique({
      where: {
        uid: +userId,
      },
      select: {
        uid: true,
        firstname: true,
        lastname: true,
        email: true,
        phone: true,
        role: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new Error("Korisnik nije pronađen.");
    }

    return user; // Return full user object
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Greška prilikom preuzimanja korisnika: ${error.message}`
      );
    }
  }
};

export const LoginUserAction = async (
  prevFormData: unknown,
  formData: FormData
): Promise<LoginUserActionResult> => {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validation = validateSchemaRedirect(loginSchema, data);
  if (validation) {
    return validation;
  }

  try {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) {
      throw new Error("Korisnik nije pronađen."); // User not found
    }

    const isPasswordValid = await verifyPassword(
      data.password,
      user.passwordHash
    );
    if (!isPasswordValid) {
      throw new Error("Pogrešna lozinka. Pokušajte ponovo."); // Incorrect password
    }

    if (user.role !== "superadmin") {
      throw new Error("Nemate administratorska prava."); // Insufficient privileges
    }

    const token = await createJWT(user.uid.toString());
    const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day expiry

    (await cookies()).set("superAdminToken", token, {
      httpOnly: true,
      secure: true, // Ensure secure cookies in production
      sameSite: "none",
      path: "/",
      maxAge: 2 * 60,
      expires: tokenExpiry,
    });

    return true;
  } catch (error) {
    return handleError(error);
  }
};

export const LogoutUserAction = async () => {
  try {
    (await cookies()).delete("superAdminToken");
  } catch (error) {
    return handleError(error);
  }
};

export const ForgotPasswordAction = async (
  prevFormData: unknown,
  formData: FormData
) => {
  const data = {
    email: formData.get("email") as string,
  };

  const validation = validateSchemaResponse(emailSchema, data.email);
  if (validation) {
    return validation;
  }

  try {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) {
      return {
        success: false,
        message: ["Korisnik nije pronađen."],
      };
    }
    if (user.role !== "superadmin") {
      return {
        success: false,
        message: ["Nemate administratorska prava."],
      };
    }

    const verificationToken = randomBytes(32).toString("hex");
    await prisma.user.update({
      where: { email: data.email },
      data: { verificationToken },
    });
    sendAdminForgotPasswordEmail(user.email, verificationToken);

    return {
      success: true,
      message: [
        "Poslali smo link za resetovanje lozinke na vašu email adresu.",
      ],
    };
  } catch (error) {
    handleError(error, {
      customMessage: `Greška prilikom slanja linka za resetovanje lozinke.`,
      throwError: true,
    });
  }
};

export const ResetPasswordAction = async (
  prevFormData: unknown,
  formData: FormData
) => {
  const data = {
    verificationToken: formData.get("verificationToken") as string,
    password: formData.get("password") as string,
  };

  const validation = validateSchemaResponse(resetPasswordSchema, data);
  if (validation) {
    return validation;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { verificationToken: data.verificationToken },
    });

    if (!user) {
      return {
        success: false,
        message: ["Verifikacioni token nije validan."],
      };
    }

    const hashedPassword = await hashPassword(data.password);
    await prisma.user.update({
      where: { verificationToken: data.verificationToken },
      data: { passwordHash: hashedPassword, verificationToken: null },
    });
    return {
      success: true,
      message: ["Vaša lozinka je uspešno resetovana."],
    };
  } catch (error) {
    handleError(error, {
      customMessage: `Greška prilikom resetovanja lozinke.`,
      throwError: true,
    });
  }
};

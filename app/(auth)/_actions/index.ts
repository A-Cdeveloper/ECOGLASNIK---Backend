"use server";

import { createJWT, decodeJWT, verifyPassword } from "@/app/_utils/auth";
import prisma from "@/app/_utils/db/db";
import { handleError } from "@/app/_utils/errorHandler";
import { loginSchema } from "@/app/_utils/zod/authSchemas";

import { cookies } from "next/headers";

type LoginUserActionResult = true | string[] | undefined;

export const LoginUserAction = async (
  prevFormData: unknown,
  formData: FormData
): Promise<LoginUserActionResult> => {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  // Validate input data
  const validation = loginSchema.safeParse(data);
  if (!validation.success) {
    return validation.error.issues.map((issue) => issue.message) as string[];
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
      maxAge: 24 * 60 * 60, // 1 day in seconds
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

/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { deleteUser } from "@/app/_utils/api_utils/users";
import { sendAdminWelcomeEmail } from "@/app/_utils/emails/sendEmail";
import prisma from "@/app/_utils/db/db";
import { validateSchemaResponse } from "@/app/_utils/errorHandler";

import {
  UserFormSchema,
  UserFormSchemaWithoutEmail,
} from "@/app/_utils/zod/userSchemas";
import { randomBytes } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const addNewUserAction = async (
  prevFormData: any,
  formData: FormData
) => {
  // await wait(15000);

  const data = {
    firstname: formData.get("firstname") as string,
    lastname: formData.get("lastname") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    isVerified: !!formData.get("isVerified") as boolean,
  };

  const validation = validateSchemaResponse(UserFormSchema, data);
  if (validation) {
    return validation;
  }

  const existingUserEmail = await prisma.user.findUnique({
    where: {
      email: data.email as string,
    },
  });

  if (existingUserEmail) {
    return {
      success: false,
      message: ["Već postoji korisnik sa ovom email adresom!"],
    };
  }

  const verificationToken = randomBytes(32).toString("hex");

  await prisma.user.create({
    data: {
      firstname: data.firstname as string,
      lastname: data.lastname as string,
      email: data.email as string,
      phone: data.phone as string,
      isVerified: data.isVerified,
      role: "superadmin",
      createdAt: new Date(),
      passwordHash: "",
      verificationToken,
    },
  });
  try {
    await sendAdminWelcomeEmail(data.email as string, verificationToken);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      success: false,
      message: ["Greška prilikom slanja emaila! Email ne postoji!"],
    };
  }

  revalidatePath("/users");
  redirect("/users");
};

export const updateUserAction = async (
  prevFormData: any,
  formData: FormData
) => {
  const updatedData = {
    firstname: formData.get("firstname") as string,
    lastname: formData.get("lastname") as string,
    phone: formData.get("phone") as string,
    isVerified: !!formData.get("isVerified") as boolean,
    role: formData.get("role") as string,
  };

  const uid = formData.get("uid") as string;

  const validation = validateSchemaResponse(
    UserFormSchemaWithoutEmail,
    updatedData
  );
  if (validation) {
    return validation;
  }

  await prisma.user.update({
    where: {
      uid: +uid,
    },
    data: {
      firstname: updatedData.firstname as string,
      lastname: updatedData.lastname as string,
      phone: updatedData.phone as string,
      isVerified: updatedData.isVerified,
      role: updatedData.role as string,
    },
  });

  revalidatePath("/users");
  redirect("/users");
};

export const deleteUserAction = async (uid: number) => {
  // assign all problems to user 1
  await prisma.problem.updateMany({
    where: {
      uid: +uid,
    },
    data: {
      uid: 1,
      status: "archive",
      updatedAt: new Date(), // Set updatedAt to the current timestamp
    },
  });

  await deleteUser(uid);
  revalidatePath("/users");
};

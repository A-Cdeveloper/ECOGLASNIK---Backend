import { NextResponse } from "next/server";
import { registerSchema } from "@/app/_utils/zod/authSchemas"; // Import your Zod schema
import prisma from "@/app/_utils/db/db"; // Adjust path to your Prisma client
import { randomBytes } from "crypto";
import { z } from "zod";
import { hashPassword } from "@/app/_utils/auth/index";
import { sendVerificationEmail } from "@/app/_utils/emails/sendEmail";
import { UserRole } from "@prisma/client";
import { t } from "@/app/_utils/messages";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate input using Zod
    const data = registerSchema.parse(body);

    // Hash password
    const passwordHash = await hashPassword(data.password);
    // // Generate a unique verification token
    const verificationToken = randomBytes(32).toString("hex");

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: t("auth.register.user_exist") },
        { status: 400 }
      );
    }

    // Save user to the database
    await prisma.user.create({
      data: {
        firstname: data.firstname,
        lastname: data.lastname,
        phone: data.phone,
        email: data.email,
        passwordHash,
        verificationToken,
        role: UserRole.USER,
      },
    });

    // Send verification email
    await sendVerificationEmail(data.email, verificationToken);

    return NextResponse.json(
      {
        message: t("auth.register.success_register").replace(
          "{email}",
          data.email
        ),
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.errors[0].message },
        { status: 400 }
      );
    }
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import prisma from "../../../_utils/db/db"; // Adjust this to your Prisma client location
//import { sendPasswordEmail } from "../../../_utils/auth/sendEmail"; // Function to send email
import { forgotPasswordSchema } from "@/app/_utils/zod/authSchemas";
import { z } from "zod";
import { sendPasswordResetEmail } from "@/app/_utils/emails/sendEmail";
import { t } from "@/app/_utils/messages";
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = forgotPasswordSchema.parse(body);

    // Find the user by email
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: t("auth.forgot-password.user_not_exist") },
        { status: 404 }
      );
    }

    const verificationToken = randomBytes(32).toString("hex");

    await prisma.user.update({
      where: { email, isVerified: true },
      data: { verificationToken },
    });

    await sendPasswordResetEmail(existingUser.email, verificationToken);

    return NextResponse.json(
      {
        message: t("auth.forgot-password.reset_link_send").replace(
          "{email}",
          existingUser.email
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

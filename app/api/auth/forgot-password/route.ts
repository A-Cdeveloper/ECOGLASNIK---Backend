import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import prisma from "../../../_utils/db/db"; // Adjust this to your Prisma client location
//import { sendPasswordEmail } from "../../../_utils/auth/sendEmail"; // Function to send email
import { forgotPasswordSchema } from "@/app/_utils/zod/authSchemas";
import { z } from "zod";
import { sendPasswordResetEmail } from "@/app/_utils/auth/sendEmail";

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
        { message: "Korisnik sa ovom email adresom ne postoji." },
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
        message: `Link za resetovanje lozinke je poslat na ${existingUser.email}. Molimo proverite i spam folder.`,
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

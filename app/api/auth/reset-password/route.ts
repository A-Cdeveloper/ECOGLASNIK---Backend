import { NextResponse } from "next/server";
import { resetPasswordSchema } from "@/app/_utils/zod/authSchemas"; // Import your Zod schema
import prisma from "@/app/_utils/db/db"; // Adjust path to your Prisma client
import { randomBytes } from "crypto";
import { z } from "zod";
import { hashPassword } from "@/app/_utils/auth";
import { sendVerificationEmail } from "@/app/_utils/auth/sendEmail";

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { error: "Verifikacioni token nije pronađen." },
      { status: 400 }
    );
  }

  // return NextResponse.json({ message: "bravo" }, { status: 200 });

  try {
    const body = await req.json();

    // Validate input using Zod
    const data = resetPasswordSchema.parse(body);

    // // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        verificationToken: token,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "Token ne postoji u bazi podataka ili je neispravan." },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(data.password);

    await prisma.user.update({
      where: {
        verificationToken: token,
      },
      data: {
        passwordHash,
        verificationToken: null,
      },
    });

    return NextResponse.json(
      { message: "Vaša lozinka je uspesno promijenjena." },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

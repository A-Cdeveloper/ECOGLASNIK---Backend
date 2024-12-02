import { hashPassword } from "@/app/_utils/auth";
import prisma from "@/app/_utils/db/db"; // Adjust path to your Prisma client
import { resetPasswordSchema } from "@/app/_utils/zod/authSchemas"; // Import your Zod schema
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  console.log(token);

  if (token === "null" || token === null) {
    return NextResponse.json(
      { message: "Verifikacioni token nije pronađen." },
      { status: 400 }
    );
  }

  try {
    const body = await req.json();

    // Validate input using Zod
    const data = resetPasswordSchema.parse(body);

    // // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        verificationToken: token!,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: "Token ne postoji u bazi podataka ili je neispravan." },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(data.password);

    await prisma.user.update({
      where: {
        verificationToken: token!,
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
      return NextResponse.json(
        { message: error.errors[0].message },
        { status: 400 }
      );
    }
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

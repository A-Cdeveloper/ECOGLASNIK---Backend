import { NextResponse } from "next/server";
import { loginSchema } from "@/app/_utils/zod/authSchemas"; // Adjust this import path accordingly
import prisma from "@/app/_utils/db/db"; // Prisma client setup
import { z } from "zod";
import { createJWT, verifyPassword } from "@/app/_utils/auth";

// API handler for login
export async function POST(req: Request) {
  try {
    const body = await req.json(); // Get request body

    // Validate request body using Zod schema
    const validatedData = loginSchema.parse(body); // This will throw an error if validation fails

    const { email, password } = validatedData;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Korisnik sa ovom email adresom ne postoji." },
        { status: 404 }
      );
    }

    // Check if the password matches
    const passwordMatch = await verifyPassword(password, user.passwordHash);
    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Pogrešna lozinka" },
        { status: 401 }
      );
    }

    // Check if user is verified
    if (!user.isVerified) {
      return NextResponse.json(
        { message: "Nalog nije verifikovan." },
        { status: 403 }
      );
    }

    // Generate JWT token
    const token = await createJWT(user.uid.toString());

    // Return successful response with token
    return NextResponse.json({
      message: "Uspešna prijava.",
      token,
      data: {
        uid: user.uid,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        phone: user.phone,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // If Zod validation fails, return validation errors
      return NextResponse.json(
        { message: "Logovanje neuspešno.", errors: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: error }, { status: 500 });
  }
}

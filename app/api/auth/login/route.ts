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
        {
          message:
            "Korisnik sa ovom email adresom ne postoji ili nije verifikovan.",
        },
        { status: 404 }
      );
    }

    // Check if the password matches
    const passwordMatch = await verifyPassword(password, user.passwordHash);
    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Pogrešna lozinka. Pokušajte ponovo." },
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

    const currentLocalTime = new Date();

    // Expiration: Add 1 hour (3600000 ms)
    const tokenExpiry = currentLocalTime.getTime() + 1 * 60 * 60 * 1000;

    // Set token in HTTP-only cookie
    const response = NextResponse.json({
      message: "Uspešna prijava.",
      tokenExpiry: tokenExpiry,
    });
    response.cookies.set("authToken", token, {
      httpOnly: true,
      secure: true, // Use secure cookies in production
      sameSite: "none",
      path: "/",
      maxAge: 1.1 * 60 * 60, // 1 day
    });

    return response;
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

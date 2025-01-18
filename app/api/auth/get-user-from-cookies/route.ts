import { decodeJWT } from "@/app/_utils/auth";
import prisma from "@/app/_utils/db/db";
import { NextResponse } from "next/server";
import { z } from "zod";

//Api handler for get user from cookies
export const GET = async (req: Request) => {
  try {
    const cookieHeader = req.headers.get("cookie");

    if (!cookieHeader) {
      return NextResponse.json(
        { error: "Token nije pronađen." },
        { status: 401 }
      );
    }

    // Parse cookies
    const cookies = cookieHeader.split("; ").reduce((acc, cookie) => {
      const [key, value] = cookie.split("=");
      acc[key] = decodeURIComponent(value);
      return acc;
    }, {} as Record<string, string>);

    const token = cookies["authToken"]; // Match the cookie name used

    if (!token) {
      return NextResponse.json(
        { error: "Nemate pravo pristupa" },
        { status: 401 }
      );
    }

    // Decode the JWT to extract userId
    const { userId } = await decodeJWT(token);

    // Fetch user data from the database
    const user = await prisma.user.findUnique({
      where: { uid: +userId },
      select: {
        uid: true,
        firstname: true,
        lastname: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "Korisnik ne postoji ili nije verifikovan.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(user); // Return the user data
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.errors[0].message },
        { status: 400 }
      );
    }
  }
};

import { authMiddleware } from "@/app/_utils/auth/authMiddleware";
import prisma from "@/app/_utils/db/db";
import { UserRole } from "@prisma/client";
//import prisma from "@/app/_utils/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const authResponse = await authMiddleware(request);
  if (!authResponse.ok) {
    return authResponse; // If unauthorized, return the middleware response
  }
  const body = await request.json();
  const { uid } = body;

  await prisma.user.updateMany({
    where: {
      AND: [{ uid: uid }, { role: { not: UserRole.SUPERADMIN } }],
    },
    data: {
      status: 0,
    },
  });

  // Create a response that clears the `authToken` cookie
  const response = NextResponse.json({
    success: true,
    message: "Uspešno ste se odjavili.",
  });

  // Clear the `authToken` cookie by setting it with a past expiration date
  response.cookies.set("authToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" || true,
    sameSite: "strict",
    expires: new Date(0), // Set the cookie expiration to the past
  });

  return response;
}

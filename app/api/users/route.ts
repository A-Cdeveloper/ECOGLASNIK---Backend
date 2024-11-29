/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/_utils/db/db";

import { authMiddleware } from "../authMiddleware";

export async function GET(request: NextRequest) {
  const authResponse = await authMiddleware(request);
  if (!authResponse.ok) {
    return authResponse; // If unauthorized, return the middleware response
  }

  try {
    const users = await prisma.user.findMany();
    const sanitizedUsers = users.map(
      ({ passwordHash, verificationToken, ...rest }) => rest
    );

    if (!sanitizedUsers) {
      return NextResponse.json(
        { error: "Korisnici nisu pronađeni" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { results: sanitizedUsers.length, data: sanitizedUsers },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Greška prilikom preuzimanja korisnika" },
      { status: 500 }
    );
  }
}

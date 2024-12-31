/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";

import { getAllUsers, getSuperAdmin } from "@/app/_utils/api_utils/users";
import { authMiddleware } from "../../_utils/auth/authMiddleware";

export async function GET(request: NextRequest) {
  const authResponse = await authMiddleware(request);
  if (!authResponse.ok) {
    return authResponse; // If unauthorized, return the middleware response
  }

  const authData = await authResponse.json();
  const adminId = +authData.userId;

  try {
    const superadmin = await getSuperAdmin(adminId);
    if (!superadmin) {
      return NextResponse.json(
        { error: "Samo administratori mogu preuzeti korisnike." },
        { status: 403 }
      );
    }
  } catch (error: unknown) {
    return NextResponse.json({ error: "Greška na serveru" }, { status: 500 });
  }

  try {
    const users = await getAllUsers();

    const sanitizedUsers = users?.map(
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
    const errorMessage = error instanceof Error && error.message;
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

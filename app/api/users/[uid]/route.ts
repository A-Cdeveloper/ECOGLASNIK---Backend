/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/_utils/db/db";
import { authMiddleware } from "../../../_utils/auth/authMiddleware";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(request: NextRequest, { params }: { params: any }) {
  const authResponse = await authMiddleware(request);
  if (!authResponse.ok) {
    return authResponse; // If unauthorized, return the middleware response
  }

  const authData = await authResponse.json();
  const authenticatedUserId = +authData.userId;

  const superadmin = await prisma.user.findUnique({
    where: {
      uid: authenticatedUserId,
      role: "superadmin",
    },
  });

  const { uid } = await params;

  if (authenticatedUserId !== +uid && !superadmin) {
    return NextResponse.json(
      { error: "Samo administratori mogu preuzeti druge korisnike." },
      { status: 403 }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        uid: +uid,
      },
      select: {
        uid: true,
        firstname: true,
        lastname: true,
        email: true,
        phone: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Korisnik nije pronađen." },
        { status: 404 }
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Greška prilikom preuzimanja korisnika" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { params }: { params: any }
) {
  const authResponse = await authMiddleware(request);
  if (!authResponse.ok) {
    return authResponse; // If unauthorized, return the middleware response
  }
  const authData = await authResponse.json();
  const authenticatedUserId = +authData.userId;

  const superadmin = await prisma.user.findUnique({
    where: {
      uid: authenticatedUserId,
      role: "superadmin",
    },
  });

  if (!superadmin) {
    throw new Error("Superadmin nije pronađen.");
  }

  const { uid } = await params;

  if (authenticatedUserId !== +uid && !superadmin) {
    return NextResponse.json(
      { error: "Nema dozvolu za brisanje drugih korisnika." },
      { status: 403 }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      uid: +uid,
    },
  });
  if (!user) {
    return NextResponse.json(
      { error: "Korisnik nije pronađen" },
      { status: 404 }
    );
  }

  try {
    await prisma.problem.updateMany({
      where: {
        uid: +uid,
      },
      data: {
        uid: superadmin.uid,
        status: "archive",
        updatedAt: new Date(), // Set updatedAt to the current timestamp
      },
    });

    const deletedUser = await prisma.user.delete({
      where: {
        uid: +uid,
      },
    });
    //return NextResponse.json(deletedUser, { status: 200 });

    const response = NextResponse.json({
      message: "Nalog je uspešno obrisan.",
      data: { ...deletedUser, status: 200 },
    });

    // Clear the `authToken` cookie by setting it with a past expiration date
    response.cookies.set("authToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" || true,
      sameSite: "strict",
      expires: new Date(0), // Set the cookie expiration to the past
    });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Greška prilikom brisanja korisnika" },
      { status: 500 }
    );
  }
}

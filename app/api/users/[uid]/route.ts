/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/_utils/db/db";
import { authMiddleware } from "../../authMiddleware";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(request: NextRequest, { params }: { params: any }) {
  const authResponse = await authMiddleware(request);
  if (!authResponse.ok) {
    return authResponse; // If unauthorized, return the middleware response
  }

  const authData = await authResponse.json();
  const authenticatedUserId = +authData.userId;

  const { uid } = await params;

  if (authenticatedUserId !== +uid) {
    return NextResponse.json(
      { error: "Nemate dozvolu za preuzimanje ovog korisnika" },
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

  const { uid } = await params;

  if (authenticatedUserId !== +uid) {
    return NextResponse.json(
      { error: "Nemate dozvolu za brisanje ovog korisnika" },
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
    const deletedUser = await prisma.user.delete({
      where: {
        uid: +uid,
      },
    });
    return NextResponse.json(deletedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Greška prilikom brisanja korisnika" },
      { status: 500 }
    );
  }
}

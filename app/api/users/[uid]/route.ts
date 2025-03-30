/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/_utils/db/db";
import { authMiddleware } from "../../../_utils/auth/authMiddleware";
import {
  deleteUser,
  getSuperAdmin,
  getUserById,
} from "@/app/_utils/api_utils/users";
import { ProblemStatus } from "@prisma/client";
import { t } from "@/app/_utils/messages";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(request: NextRequest, { params }: { params: any }) {
  const authResponse = await authMiddleware(request);
  if (!authResponse.ok) {
    return authResponse; // If unauthorized, return the middleware response
  }

  const authData = await authResponse.json();
  const adminId = +authData.userId;
  const authenticatedUserId = +authData.userId;

  const { uid } = await params;

  try {
    const user = await getUserById(+uid);

    if (!user) {
      return NextResponse.json({ error: t("users.no_user") }, { status: 404 });
    }
    const superadmin = await getSuperAdmin(adminId);
    if (authenticatedUserId !== +uid && !superadmin) {
      return NextResponse.json(
        { error: t("users.restrict_access") },
        { status: 403 }
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: t("server_error") }, { status: 500 });
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
  const adminId = +authData.userId;
  const authenticatedUserId = +authData.userId;

  const { uid } = await params;

  try {
    const user = await getUserById(+uid);

    if (!user) {
      return NextResponse.json({ error: t("users.no_user") }, { status: 404 });
    }
    const superadmin = await getSuperAdmin(adminId);

    if (authenticatedUserId !== +uid && !superadmin) {
      return NextResponse.json(
        { error: t("users.no_delete_permision") },
        { status: 403 }
      );
    }

    await prisma.problem.updateMany({
      where: {
        uid: +uid,
      },
      data: {
        uid: 1,
        status: ProblemStatus.ARCHIVE,
        updatedAt: new Date(), // Set updatedAt to the current timestamp
      },
    });

    const deletedUser = await deleteUser(+uid);

    const response = NextResponse.json({
      message: t("users.user_deleted_success"),
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
    const errorMessage = error instanceof Error && error.message;
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

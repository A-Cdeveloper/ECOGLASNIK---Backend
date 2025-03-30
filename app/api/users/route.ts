/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";

import { getAllUsers, getSuperAdmin } from "@/app/_utils/api_utils/users";
import { User } from "@prisma/client";
import { authMiddleware } from "../../_utils/auth/authMiddleware";
import { t } from "@/app/_utils/messages";

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
        { error: t("users.restrict_access") },
        { status: 403 }
      );
    }
  } catch (error: unknown) {
    return NextResponse.json({ error: t("server_error") }, { status: 500 });
  }

  try {
    const { users, totalUsers } = (await getAllUsers()) as {
      users: User[];
      totalUsers: number;
    };

    const sanitizedUsers = users?.map(
      ({ passwordHash, verificationToken, ...rest }) => rest
    );

    if (!sanitizedUsers) {
      return NextResponse.json({ error: t("users.no_users") }, { status: 404 });
    }

    return NextResponse.json(
      { results: totalUsers, data: sanitizedUsers },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error && error.message;
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

import { NextResponse, NextRequest } from "next/server";

import { JWTPayload } from "jose";
import { verifyJWT } from ".";

import { t } from "@/app/_utils/messages";

type AuthResponseSuccess = {
  userId: JWTPayload["userId"]; // Adjust `JWTPayload` to the actual type returned by `verifyJWT`.
};

type AuthResponseError = {
  error: string;
  status: number;
};

export async function authMiddleware(
  request: NextRequest
): Promise<NextResponse<AuthResponseSuccess | AuthResponseError>> {
  const cookieHeader = request.headers.get("cookie");

  if (!cookieHeader) {
    return NextResponse.json(
      {
        error: t("auth.no_access"),
        userId: null,
      },
      { status: 401 }
    );
  }

  const cookies = Object.fromEntries(
    cookieHeader.split("; ").map((c) => c.split("="))
  );
  const token = cookies.authToken;

  if (!token) {
    return NextResponse.json(
      {
        error: t("auth.no_access"),
        userId: null,
      },
      { status: 401 }
    );
  }

  try {
    const { payload } = await verifyJWT(token);

    return NextResponse.json({ userId: payload.userId });
    // return NextResponse.next();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      {
        error: t("auth.no_access"),
        userId: null,
      },
      { status: 401 }
    );
  }
}

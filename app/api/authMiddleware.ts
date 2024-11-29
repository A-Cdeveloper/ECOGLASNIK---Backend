import { NextResponse, NextRequest } from "next/server";
import { verifyJWT } from "../_utils/auth";
import { JWTPayload } from "jose";

type AuthResponseSuccess = {
  userId: JWTPayload["userId"]; // Adjust `JWTPayload` to the actual type returned by `verifyJWT`.
};

type AuthResponseError = {
  error: string;
  status: number;
};

export async function authMiddleware(
  request: NextRequest
): Promise<
  NextResponse<AuthResponseError> | NextResponse<AuthResponseSuccess>
> {
  const cookieHeader = request.headers.get("cookie");

  if (!cookieHeader) {
    return NextResponse.json({
      error: "Pristup nije autorizovan.",
      status: 401,
      userId: null,
    });
  }

  const cookies = Object.fromEntries(
    cookieHeader.split("; ").map((c) => c.split("="))
  );
  const token = cookies.authToken;

  if (!token) {
    return NextResponse.json({
      error: "Pristup nije autorizovan.",
      status: 401,
      userId: null,
    });
  }

  try {
    const { payload } = await verifyJWT(token);

    return NextResponse.json({ userId: payload.userId });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({
      error: "Pristup nije autorizovan.",
      status: 401,
      userId: null,
    });
  }
}

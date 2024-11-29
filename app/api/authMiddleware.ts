import { NextResponse, NextRequest } from "next/server";
import { verifyJWT } from "../_utils/auth";
//import { jwtVerify } from "jose";

//const secretKey = process.env.JWT_SECRET!;

export async function authMiddleware(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie");

  if (!cookieHeader) {
    return NextResponse.json(
      { error: "Pristip nije autorizovan." },
      { status: 401 }
    );
  }

  const cookies = Object.fromEntries(
    cookieHeader.split("; ").map((c) => c.split("="))
  );
  const token = cookies.authToken;

  if (!token) {
    return NextResponse.json(
      { error: "Pristip nije autorizovan." },
      { status: 401 }
    );
  }

  try {
    await verifyJWT(token);
    return NextResponse.next(); // Allow the request
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Pristip nije autorizovan." },
      { status: 401 }
    );
  }
}

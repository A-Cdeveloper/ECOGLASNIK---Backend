import bcrypt from "bcrypt";
import { SignJWT, jwtVerify } from "jose";

export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const verifyPassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

export const createJWT = async (
  userId: string,
  tokenExpiry?: number
): Promise<string> => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const expiry = tokenExpiry ?? Date.now() + 2 * 60 * 60 * 1000; // Default: 2 hours

  return await new SignJWT({ userId, tokenExpiry: expiry })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expiry / 1000)
    .sign(secret);
};

export const decodeJWT = async (
  token: string
): Promise<{ userId: string; tokenExpiry?: string }> => {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    if (!payload.userId) {
      throw new Error("Invalid token: Missing userId");
    }

    // `tokenExpiry` is optional, so it's included only if available
    return {
      userId: payload.userId as string,
      tokenExpiry: payload.tokenExpiry
        ? (payload.tokenExpiry as string)
        : undefined,
    };
  } catch (error) {
    console.error("Error decoding token:", error);
    throw new Error("Token is not valid.");
  }
};

export const verifyJWT = async (token: string) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  return await jwtVerify(token, secret);
};

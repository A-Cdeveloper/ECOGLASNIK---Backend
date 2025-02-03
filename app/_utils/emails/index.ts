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

const logo = `${process.env.BASE_URL}/ecoglasnik.png`;

export const emailHtml = (
  url: string,
  emailText: string,
  buttonText: string
) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          html, body {
            font-family: Arial, sans-serif;
            background-color: #2B2D42;
            margin: 0;
            padding: 20px;
            height: 100%;
          }
          .email-container {
            max-width: 600px;
            margin: 0px auto;
            background-color: #2B2D42;
            padding: 20px;
           
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .header img {
            max-width: 220px;
          }
          .content {
            text-align: center;
            color: #fff;
          }
          .content a {
            display: inline-block;
            margin: 10px 0px;
            padding: 10px 20px;
            background-color: #0C5E10FF;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
          }
          .content a:hover {
            background-color: #0C9213FF;
            text-decoration: none!important;
          }
          .note {
            margin-top: 20px;
            color: #A1A4BEFF;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <a href="${process.env.BASE_URL}"><img src="${logo}" alt="ECOGLASNIK" /></a>
          </div>
          <div class="content">
            <p>${emailText}</p>
            <a href="${url}">${buttonText}</a>
            <p class="note">Ako Vi niste otvorili ovaj nalog, možete da zanemarite ovu e-poruku.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

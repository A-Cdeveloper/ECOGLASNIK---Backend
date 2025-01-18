import bcrypt from "bcrypt";
import { SignJWT, jwtVerify } from "jose";

export const hashPassword = async (password: string) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const verifyPassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

export const createJWT = async (userId: string) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  return await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("2h")
    .sign(secret);
};

export const decodeJWT = async (token: string): Promise<{ userId: string }> => {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    if (!payload.userId) {
      throw new Error("Invalid token: Missing userId");
    }

    return { userId: payload.userId as string };
  } catch (error) {
    console.error("Greška prilikom dekodiranja tokena:", error);
    throw new Error("Token nije validan.");
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

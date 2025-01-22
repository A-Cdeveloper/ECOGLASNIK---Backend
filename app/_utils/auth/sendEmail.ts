import nodemailer from "nodemailer";
import { emailHtml } from ".";
import { headers } from "next/headers";

export const getRootUrl = async (): Promise<string> => {
  // Server-side
  const headersList = headers();
  const protocol = (await headersList).get("x-forwarded-proto") || "http";
  const host = (await headersList).get("host");
  return `${protocol}://${host}`;
};

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // SMTP server host
  port: 465, // SMTP port (e.g., 587 for TLS, 465 for SSL)
  secure: true, // Set to true for SSL (port 465), false for TLS (port 587)
  auth: {
    user: process.env.EMAIL_USER, // Email address
    pass: process.env.EMAIL_PASS, // Password or app-specific password
  },
  tls: {
    rejectUnauthorized: false, // Useful for self-signed certificates
  },
});

export const sendEmail = async (
  email: string,
  url: string,
  subject: string,
  message: string,
  buttonText: string
) => {
  await transporter.sendMail({
    from: '"ECOGLASNIK" <admin@cleanme.e-vlasotince.info>',
    to: email,
    subject,
    html: emailHtml(url, message, buttonText),
  });
};

/// FRONTEND APP

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationUrl = `${process.env.BASE_URL}/login/verify-account?token=${token}`;
  await sendEmail(
    email,
    verificationUrl,
    "ECOGLASNIK - Aktivacija naloga",
    "Potvrdite svoju adresu e-pošte klikom na dugme ispod:",
    "Aktivirajte nalog"
  );
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetUrl = `${process.env.BASE_URL}/login/reset-password?token=${token}`;

  await sendEmail(
    email,
    resetUrl,
    "ECOGLASNIK - Reset lozinke",
    "Klinikite na dugme ispod da biste resetovali svoju lozinku:",
    "Resetuj lozinku"
  );
};

/// BACKEND APP
export const sendAdminWelcomeEmail = async (email: string, token: string) => {
  const resetUrl = `${await getRootUrl()}/reset-password?token=${token}`;

  await sendEmail(
    email,
    resetUrl,
    "ECOGLASNIK - Kreiran administratorski nalog",
    "Dobro došli! Vaš administratorki nalog je uspešno kreiran. Kliknite na dugme ispod da biste postavili svoju lozinku:",
    "Postavi lozinku"
  );
};

export const sendAdminForgotPasswordEmail = async (
  email: string,
  token: string
) => {
  const resetUrl = `${await getRootUrl()}/reset-password?token=${token}`;

  await sendEmail(
    email,
    resetUrl,
    "ECOGLASNIK - Reset lozinke",
    "Klinikite na dugme ispod da biste resetovali svoju lozinku:",
    "Resetuj lozinku"
  );
};

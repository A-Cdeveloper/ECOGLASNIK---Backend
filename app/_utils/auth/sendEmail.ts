import nodemailer from "nodemailer";
import { emailHtml } from ".";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // SMTP server host
  port: Number(process.env.SMTP_PORT), // SMTP port (e.g., 587 for TLS, 465 for SSL)
  secure: true, // Set to true for SSL (port 465), false for TLS (port 587)
  auth: {
    user: process.env.EMAIL_USER, // Email address
    pass: process.env.EMAIL_PASS, // Password or app-specific password
  },
  tls: {
    rejectUnauthorized: false, // Useful for self-signed certificates
  },
});

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationUrl = `${process.env.BASE_URL}/login/verify-account?token=${token}`;

  await transporter.sendMail({
    from: '"ECOGLASNIK" <admin@cleanme.e-vlasotince.info>',
    to: email,
    subject: "ECOGLASNIK - Aktivacija naloga",
    html: emailHtml(
      verificationUrl,
      "Potvrdite svoju adresu e-pošte klikom na dugme ispod:",
      "Aktivirajte nalog"
    ),
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetUrl = `${process.env.BASE_URL}/login/reset-password?token=${token}`;

  await transporter.sendMail({
    from: '"ECOGLASNIK" <admin@cleanme.e-vlasotince.info>',
    to: email,
    subject: "ECOGLASNIK - Reset lozinke",
    html: emailHtml(
      resetUrl,
      "Klinikite na dugme ispod da biste resetovali svoju lozinku:",
      "Resetuj lozinku"
    ),
  });
};

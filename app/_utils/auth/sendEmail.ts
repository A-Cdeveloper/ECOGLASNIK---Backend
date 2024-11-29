import nodemailer from "nodemailer";
import { emailHtml } from ".";

const transporter = nodemailer.createTransport({
  service: "Gmail", // Replace with your email service
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app-specific password
  },
});

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationUrl = `${process.env.BASE_URL}/login/verify-account?token=${token}`;

  await transporter.sendMail({
    from: '"CleanMe" <cleanme@e-seo.info>',
    to: email,
    subject: "CleanMe - Aktivacija naloga",
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
    from: '"CleanMe" <cleanme@e-seo.info>',
    to: email,
    subject: "CleanMe - Reset lozinke",
    html: emailHtml(
      resetUrl,
      "Klinikite na dugme ispod da biste resetovali svoju lozinku:",
      "Resetuj lozinku"
    ),
  });
};

import { z } from "zod";

// Shared Fields
export const emailSchema = z.string().email("Email nije validan.");

const phoneSchema = z
  .string()
  .regex(
    /^(\+381|0)(6[0-6]|11|2[1-9]|3[0-5]|3[7-9]|4[0-7]|5[0-9]|7[0-9]|8[0-9]|9[0-9])\d{6,7}$/,
    "Telefon mora da počinje 0 ili +381 i mora biti validan telefonski broj."
  );

// Strict Password Validation for Registration
const registerPasswordSchema = z
  .string()
  .min(8, "Lozinka mora imati najmanje 8 karaktera.")
  .regex(/[A-Z]/, "Lozinka mora imati najmanje jedno veliko slovo.")
  .regex(/[0-9]/, "Lozinka mora imati najmanje jedan broj.")
  .regex(/[@$!%*?&#]/, "Lozinka mora imati najmanje jedan specijalan karakter.")
  .max(100, "Lozinka mora biti kraća od 100 karaktera.");

// Basic Password Validation for Login
const loginPasswordSchema = z.string().min(1, "Lozinka je obavezna.");

// Full Register Schema
export const registerSchema = z.object({
  firstname: z
    .string()
    .min(1, "Ime je obavezno")
    .max(50, "Ime mora biti kraće od 50 karaktera."),
  lastname: z
    .string()
    .min(1, "Prezime je obavezno")
    .max(50, "Prezime mora biti kraće od 50 karaktera."),
  phone: phoneSchema,
  email: emailSchema,
  password: registerPasswordSchema,
});

// Login Schema Using Shared Fields
export const loginSchema = z.object({
  email: emailSchema,
  password: loginPasswordSchema,
});

// Login Schema Using Shared Fields
export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

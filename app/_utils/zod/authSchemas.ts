import { z } from "zod";

// Shared Fields
export const emailSchema = z
  .string()
  .refine((value) => value.trim() !== "", {
    message: "Email je obavezan",
  })
  .refine((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
    message: "Email nije validan.",
  });

export const phoneSchema = z
  .string()
  .refine((value) => value.trim() !== "", {
    message: "Telefon je obavezan",
  })
  .refine(
    (value) =>
      /^(\+381|0)(6[0-6]|11|2[1-9]|3[0-5]|3[7-9]|4[0-7]|5[0-9]|7[0-9]|8[0-9]|9[0-9])\d{6,7}$/.test(
        value
      ),
    {
      message:
        "Telefon mora da počinje sa 0 ili +381 i mora biti validan telefonski broj.",
    }
  );

// Strict Password Validation for Registration
export const registerPasswordSchema = z
  .string()
  .refine((value) => value.trim() !== "", {
    message: "Lozinka je obavezna",
  })
  .refine((value) => value.length >= 8, {
    message: "Lozinka mora imati najmanje 8 karaktera.",
  })
  .refine((value) => value.length <= 100, {
    message: "Lozinka mora biti kraća od 100 karaktera.",
  })
  .refine((value) => /[A-Z]/.test(value), {
    message: "Lozinka mora imati najmanje jedno veliko slovo.",
  })
  .refine((value) => /[0-9]/.test(value), {
    message: "Lozinka mora imati najmanje jedan broj.",
  })
  .refine((value) => /[@$!%*?&#]/.test(value), {
    message: "Lozinka mora imati najmanje jedan specijalan karakter.",
  });

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

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z.object({
  password: registerPasswordSchema,
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

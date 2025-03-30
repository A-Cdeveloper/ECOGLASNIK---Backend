import { z } from "zod";
import { t } from "../messages";

// Shared Fields
export const emailSchema = z
  .string()
  .refine((value) => value.trim() !== "", {
    message: t("zod.email_empty"),
  })
  .refine((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
    message: t("zod.email_invalid"),
  })
  .transform((val) => val.trim());

export const phoneSchema = z
  .string()
  .refine(
    (value) => {
      if (value !== "" && value !== null && value !== undefined) {
        return /^(\+381|0)\s*(6[0-689]|1[1-9])\s*\d{6,7}$/.test(value);
      }
      return true;
    },
    {
      message: t("zod.phone_invalid"),
    }
  )
  .transform((val) => val.trim());

// Strict Password Validation for Registration
export const registerPasswordSchema = z
  .string()
  .refine((value) => value.trim() !== "", {
    message: t("zod.password_empty"),
  })
  .refine((value) => value.length >= 8, {
    message: t("zod.password_too_short"),
  })
  .refine((value) => value.length <= 100, {
    message: t("zod.password_too_long"),
  })
  .refine((value) => /[A-Z]/.test(value), {
    message: t("zod.password_alpha_caps"),
  })
  .refine((value) => /[0-9]/.test(value), {
    message: t("zod.password_numeric"),
  })
  .refine((value) => /[@$!%*?&#]/.test(value), {
    message: t("zod.password_special"),
  })
  .transform((val) => val.trim());

// Basic Password Validation for Login
const loginPasswordSchema = z.string().min(1, t("zod.password_empty"));

// Full Register Schema
export const registerSchema = z.object({
  firstname: z
    .string()
    .min(1, t("zod.firstname_empty"))
    .max(50, t("zod.firstname_too_long"))
    .transform((val) => val.trim()),
  lastname: z
    .string()
    .min(1, t("zod.lastname_empty"))
    .max(50, t("zod.lastname_too_long"))
    .transform((val) => val.trim()),
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

import { z } from "zod";
import { emailSchema, phoneSchema } from "./authSchemas";

const BaseUserFormSchema = z.object({
  firstname: z
    .string()
    .min(1, "Ime je obavezno")
    .max(50, "Ime mora biti kraće od 50 karaktera.")
    .transform((val) => val.trim()),
  lastname: z
    .string()
    .min(1, "Prezime je obavezno")
    .max(50, "Prezime mora biti kraće od 50 karaktera.")
    .transform((val) => val.trim()),
  phone: phoneSchema,
});

export const UserFormSchema = BaseUserFormSchema.extend({
  email: emailSchema,
});

export const UserFormSchemaWithoutEmail = BaseUserFormSchema;

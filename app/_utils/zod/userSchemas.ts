import { z } from "zod";
import { emailSchema, phoneSchema } from "./authSchemas";
import { t } from "../messages";
const BaseUserFormSchema = z.object({
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
});

export const UserFormSchema = BaseUserFormSchema.extend({
  email: emailSchema,
});

export const UserFormSchemaWithoutEmail = BaseUserFormSchema;

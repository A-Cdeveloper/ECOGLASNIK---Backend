import { z } from "zod";
import { emailSchema, phoneSchema } from "./authSchemas";
import { t } from "../messages";
// Schema for incoming form data
export const OrganisationFormSchema = z.object({
  organisation_name: z
    .string()
    .min(1, t("zod.organisation_empty"))
    .max(60, t("zod.organisation_too_long")),
  organisation_address: z
    .string()
    .min(1, t("zod.address_empty"))
    .max(60, t("zod.address_too_long")),
  organisation_email: emailSchema,
  organisation_phone: phoneSchema,
  categories: z.array(z.number().int()).min(1, t("zod.organisation_category")),
});

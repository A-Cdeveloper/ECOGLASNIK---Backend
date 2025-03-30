import { z } from "zod";
import { t } from "../messages";
// Schema for incoming form data
export const CategoryFormSchema = z.object({
  cat_name: z
    .string()
    .min(1, t("zod.category_empty")) // Minimum length
    .max(60, t("zod.category_too_long")), // Maximum length
  organisations: z
    .array(z.number().int())
    .min(1, t("zod.category_organisation")),
});

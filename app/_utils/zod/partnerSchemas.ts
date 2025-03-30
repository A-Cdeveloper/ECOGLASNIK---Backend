import { z } from "zod";
import { MAX_UPLOAD_FILE_SIZE } from "@/app/config";
import { t } from "../messages";
// Schema for incoming form data

export const PartnerImageSchema = z
  .custom<File>((file) => file instanceof File, { message: t("server_error") })
  .refine((file) => file.size > 0, { message: t("zod.partner_logo_fail") })
  .refine((file) => file.size <= MAX_UPLOAD_FILE_SIZE, {
    message: t("zod.partner_logo_maxsize"),
  })
  .refine((file) => ["image/jpeg", "image/png"].includes(file.type), {
    message: t("zod.partner_logo_type"),
  });

export const PartnerSchema = z.object({
  partnerName: z
    .string()
    .min(1, t("zod.partner_empty"))
    .max(60, t("zod.partner_too_long")),
  partnerLogo: z.string().min(1, t("zod.partner_logo_empty")),
});

import { z } from "zod";
import { t } from "../messages";
// Zod schema for the main object
export const appSettingsSchema = z.object({
  appArea: z
    .string()
    .min(1, t("zod.area_empty"))
    .max(60, t("zod.area_too_long")),
  initialZoom: z
    .number()
    .int()
    .min(10, t("zod.initial_zoom_too_low"))
    .max(21, t("zod.initial_zoom_too_high")),
  defaultPosition: z.object({
    lat: z.number().min(1, t("zod.latitude_empty")),
    lng: z.number().min(1, t("zod.longitude_empty")),
  }),
});

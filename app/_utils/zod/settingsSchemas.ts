import { z } from "zod";

// Zod schema for the main object
export const appSettingsSchema = z.object({
  appArea: z
    .string()
    .min(1, "Područje je obavezno")
    .max(60, "Područje mora biti maksimalno 60 karaktera"),
  initialZoom: z
    .number()
    .int()
    .min(10, "Inicijalni zoom mora biti minimalno 10")
    .max(21, "Inicijalni zoom mora biti maksimalno 21"),
  defaultPosition: z.object({
    lat: z.number().min(1, "Latitude is required"),
    lng: z.number().min(1, "Longitude is required"),
  }),
});

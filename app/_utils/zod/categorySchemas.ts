import { z } from "zod";

// Schema for incoming form data
export const CategoryFormSchema = z.object({
  cat_name: z
    .string()
    .min(1, "Ime kategorije je obavezno") // Minimum length
    .max(60, "Ime kategorije mora biti maksimalno 60 karaktera"), // Maximum length
  organisations: z
    .array(z.number().int())
    .min(1, "Morate odabrati barem jednu nadležnu službu"),
});

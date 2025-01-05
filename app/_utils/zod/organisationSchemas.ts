import { z } from "zod";
import { emailSchema, phoneSchema } from "./authSchemas";

// Schema for incoming form data
export const OrganisationFormSchema = z.object({
  organisation_name: z
    .string()
    .min(1, "Naziv službe je obavezan")
    .max(60, "Naziv službe mora biti maksimalno 60 karaktera"),
  organisation_address: z
    .string()
    .min(1, "Adresa je obavezna")
    .max(60, "Adresa mora biti maksimalno 60 karaktera"),
  organisation_email: emailSchema,
  organisation_phone: phoneSchema,
  categories: z
    .array(z.number().int())
    .min(1, "Morate odabrati barem jednu kategoriju problema"),
});

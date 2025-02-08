import { z } from "zod";
import { containsProfanity } from "../helpers";

// Shared position schema
export const positionSchema = z.object({
  lat: z.string().min(1, "Latitude is required"),
  lng: z.string().min(1, "Longitude is required"),
});

// Shared problem fields
const problemBaseSchema = z.object({
  title: z
    .string()
    .min(1, "Naslov problema je obavezan")
    .max(60, "Naslov mora biti maksimalno 60 karaktera")
    .transform((val) => val.trim())
    .refine((val) => !containsProfanity(val), {
      message: "Nalov sadrži neprimerene reči.",
    }),
  description: z
    .string()
    .min(1, "Opis problema je obavezan.")
    .max(300, "Opis problema mora biti maksimalno 300 karaktera")
    .transform((val) => val.trim())
    .refine((val) => !containsProfanity(val), {
      message: "Opis sadrži neprimerene reči.",
    }),
  officialEmail: z.string().optional(),
  cat_id: z.number().int(),
  image: z.string().optional(),
  pinata_id: z.string().optional(),
});

export const problemSchema = problemBaseSchema.extend({
  id: z.string().uuid(),
  position: positionSchema, // Use the shared position schema
  uid: z.number().int(),
});

export const updateProblemSchema = problemBaseSchema
  .extend({
    status: z.union([
      z.literal("done"),
      z.literal("active"),
      z.literal("archived"),
      z.literal("waiting"),
      z.undefined(),
    ]), // Additional field for updates
  })
  .partial(); // Make all fields optional

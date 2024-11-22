import { z } from "zod";

// Shared position schema
const positionSchema = z.object({
  lat: z.string().min(1, "Latitude is required"),
  lng: z.string().min(1, "Longitude is required"),
});

// Shared problem fields
const problemBaseSchema = z.object({
  title: z
    .string()
    .min(1, "Naslov je obavezan")
    .max(30, "Naslov mora biti maksimalno 30 karaktera"),
  description: z
    .string()
    .min(1, "Opis problema je obavezan.")
    .max(50, "Opis problema mora biti maksimalno 50 karaktera"),
  cat_id: z.number().int(),
  image: z.string().optional().default(""),
});

export const problemSchema = problemBaseSchema.extend({
  id: z.string().uuid(),
  position: positionSchema, // Use the shared position schema
  uid: z.number().int(),
});

export const updateProblemSchema = problemBaseSchema
  .extend({
    title: problemBaseSchema.shape.title.max(40).optional(), // Adjust max length for title
    status: z.union([z.literal("done"), z.undefined()]), // Additional field for updates
  })
  .partial(); // Make all fields optional

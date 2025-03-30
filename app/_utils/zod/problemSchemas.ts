import { z } from "zod";
import { containsProfanity } from "../helpers";
import { ProblemStatus } from "@prisma/client";
import { t } from "../messages";
// Shared position schema
export const positionSchema = z.object({
  lat: z.string().min(1, t("zod.latitude_empty")),
  lng: z.string().min(1, t("zod.longitude_empty")),
});

// Shared problem fields
const problemBaseSchema = z.object({
  title: z
    .string()
    .min(1, t("zod.problem_title_empty"))
    .max(60, t("zod.problem_title_too_long"))
    .transform((val) => val.trim())
    .refine((val) => !containsProfanity(val), {
      message: t("zod.problem_title_banned"),
    }),
  description: z
    .string()
    .min(1, t("zod.problem_description_empty"))
    .max(300, t("zod.problem_description_too_long"))
    .transform((val) => val.trim())
    .refine((val) => !containsProfanity(val), {
      message: t("zod.problem_description_banned"),
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
      z.literal(ProblemStatus.DONE),
      z.literal(ProblemStatus.ACTIVE),
      z.literal(ProblemStatus.ARCHIVE),
      z.literal(ProblemStatus.WAITING),
      z.undefined(),
    ]), // Additional field for updates
  })
  .partial(); // Make all fields optional

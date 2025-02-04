import { z } from "zod";
import { MAX_UPLOAD_FILE_SIZE } from "../contants";

// Schema for incoming form data

export const PartnerImageSchema = z
  .custom<File>((file) => file instanceof File, { message: "Greška" })
  .refine((file) => file.size > 0, { message: "Slika nije uploadovana" })
  .refine((file) => file.size <= MAX_UPLOAD_FILE_SIZE, {
    message: "Maksimalna veličina fotografije je 15MB",
  })
  .refine((file) => ["image/jpeg", "image/png"].includes(file.type), {
    message: "Fotografija mora biti u JPG ili PNG formatu",
  });

export const PartnerSchema = z.object({
  partnerName: z
    .string()
    .min(1, "Naziv partnera je obavezan")
    .max(60, "Naziv partnera mora biti maksimalno 60 karaktera"),
  partnerLogo: z.string().min(1, "Slika partnera je obavezna"),
});

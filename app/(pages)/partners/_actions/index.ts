/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import prisma from "@/app/_utils/db/db";
import {
  handleError,
  validateSchemaRedirect,
  validateSchemaResponse,
} from "@/app/_utils/errorHandler";
import { getOptimizedImageURL, pinata } from "@/app/_utils/pinata/config";
import {
  PartnerImageSchema,
  PartnerSchema,
} from "@/app/_utils/zod/partnerSchemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const addNewPartnerAction = async (
  prevFormData: any,
  formData: FormData
) => {
  // await wait(15000);

  const data = {
    partnerName: formData.get("partnerName") as string,
    partnerLogo: formData.get("partnerLogo") as string,
  };

  const validation = validateSchemaRedirect(PartnerSchema, data);
  if (validation) {
    return validation;
  }

  await prisma.partners.create({
    data: {
      partnerName: data.partnerName as string,
      partnerLogo: data.partnerLogo as string,
    },
  });

  revalidatePath("/partners");
  redirect("/partners");
};

export const updatePartnerAction = async (
  prevFormData: any,
  formData: FormData
) => {
  const updateData = {
    partnerName: formData.get("partnerName") as string,
    partnerLogo: formData.get("partnerLogo") as string,
  };

  const pid = formData.get("pid") as string;

  const validation = validateSchemaRedirect(PartnerSchema, updateData);
  if (validation) {
    return validation;
  }

  await prisma.partners.update({
    where: {
      pid: +pid,
    },
    data: {
      partnerName: updateData.partnerName as string,
      partnerLogo: updateData.partnerLogo as string,
    },
  });

  revalidatePath("/partners");
  redirect("/partners");
};

export const deletePartnerByIdAction = async (id: number) => {
  try {
    // Delete the partners
    await prisma.partners.delete({
      where: {
        pid: id,
      },
    });

    revalidatePath("/partnerss");
  } catch (error: unknown) {
    handleError(error, {
      customMessage: `Greška prilikom brisanja partnera.`,
      throwError: true,
    });
  }
};

export const uploadPartnerImageAction = async (file: File) => {
  const validation = validateSchemaResponse(PartnerImageSchema, file);
  if (validation) {
    return validation;
  }

  // try {
  const uploadImage = await pinata.upload.file(file);
  const url = (await getOptimizedImageURL(uploadImage.cid)) as string;

  return {
    success: true,
    message: [url],
  };
};

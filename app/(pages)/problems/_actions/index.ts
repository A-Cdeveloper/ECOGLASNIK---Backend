/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getProblemById } from "@/app/_utils/api_utils/problems-api";
import { MAX_UPLOAD_FILE_SIZE } from "@/app/_utils/contants";
import prisma from "@/app/_utils/db/db";
import { handleError, validateSchemaRedirect } from "@/app/_utils/errorHandler";
import {
  getOptimizedImageURL,
  optimizeImage,
  pinata,
} from "@/app/_utils/pinata/config";
import { updateProblemSchema } from "@/app/_utils/zod/problemSchemas";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
// import { redirect } from "next/navigation";

export const cloneProblemByIdAction = async (id: string) => {
  try {
    // Fetch the category to be cloned
    const problem = await getProblemById(id);

    if (!problem) {
      throw new Error(`Problem sa ID-om ${id} nije pronađen.`);
    }

    // Create the new category with a modified name
    const clonedProblem = await prisma.problem.create({
      data: {
        title: `Clone - ${problem.title}`,
        createdAt: new Date(), // Set the current date/time
        description: `Clone - ${problem.description}`,
        status: problem.status,
        uid: problem.uid,
        cat_id: problem.cat_id,
        image: problem.image,
        pinata_id: problem.pinata_id,
        position: problem.position as any,
      },
    });
    revalidatePath("/problems");

    return clonedProblem;
  } catch (error: unknown) {
    handleError(error, {
      customMessage: `Greška prilikom kloniranja problema.`,
      throwError: true,
    });
  }
};

export const updateProblemAction = async (
  prevFormData: any,
  formData: FormData
) => {
  const updateData = {
    id: formData.get("id") as string,
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    status: formData.get("status") as "active" | "done" | "archived",
    position: JSON.parse(formData.get("position") as string),
    cat_id: Number(formData.get("cat_id")) as number,
    updatedAt: formData.get("status") !== "active" ? new Date() : null,
    pinata_id: formData.get("pinata_id") as string,
    image: formData.get("image") as string,
  };

  console.log(updateData);

  const validation = validateSchemaRedirect(updateProblemSchema, updateData);
  if (validation) {
    return validation;
  }

  await prisma.problem.update({
    where: {
      id: updateData.id as string,
    },
    data: {
      title: updateData.title as string,
      description: updateData.description as string,
      status: updateData.status as string,
      position: updateData.position as any,
      cat_id: +updateData.cat_id,
      updatedAt: updateData.updatedAt as any,
      pinata_id: updateData.pinata_id as string,
      image: updateData.image as string,
    },
  });

  revalidatePath("/problems");
  redirect("/problems");
};

export const deleteProblemByIdAction = async (id: string) => {
  try {
    await prisma.problem.delete({
      where: {
        id: id,
      },
    });

    revalidatePath("/problems");
  } catch (error: unknown) {
    handleError(error, {
      customMessage: `Greška prilikom brisanja problema.`,
      throwError: true,
    });
  }
};

// IMAGE
export const uploadProblemImageAction = async (file: File) => {
  if (file.size === 0) {
    throw new Error(`Slika nije uploadovana`);
  }

  if (file.size > MAX_UPLOAD_FILE_SIZE) {
    throw new Error(`Maksimalna velicina fotografije je 10MB`);
  }

  if (file.type !== "image/jpeg" && file.type !== "image/png") {
    throw new Error(`Fotografija mora biti u JPG ili PNG formatu`);
  }

  const optimizeFile = await optimizeImage(file);

  try {
    const uploadImage = await pinata.upload.file(optimizeFile);
    const url = (await getOptimizedImageURL(uploadImage.cid)) as string;

    return {
      url: url,
      id: uploadImage.id,
    };
  } catch (error: unknown) {
    handleError(error, {
      customMessage: `Greška prilikom dodavanja fotografije problema.`,
      throwError: true,
    });
  }
};

export const deleteProblemImageAction = async (id: string) => {
  try {
    await prisma.problem.update({
      where: {
        id: id,
      },
      data: {
        image: "",
        pinata_id: "",
      },
    });
  } catch (error: unknown) {
    handleError(error, {
      customMessage: `Greška prilikom brisanja fotografije problema.`,
      throwError: true,
    });
  }
};

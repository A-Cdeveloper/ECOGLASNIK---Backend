/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getCategoryById } from "@/app/_utils/api_utils/categories";
import prisma from "@/app/_utils/db/db";
import {
  handleError,
  validateSchemaRedirect,
} from "@/app/_utils/helpers/errorHandler";
import { CategoryFormSchema } from "@/app/_utils/zod/categorySchemas";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const addNewCategoryAction = async (
  prevFormData: any,
  formData: FormData
) => {
  const data = {
    cat_name: formData.get("cat_name"),
    organisations: formData.getAll("organisations").map((id) => Number(id)), // Convert to numbers
  };

  const validation = validateSchemaRedirect(CategoryFormSchema, data);
  if (validation) {
    return validation;
  }

  await prisma.problemCategory.create({
    data: {
      cat_name: data.cat_name as string,
      organisations: {
        connect: data.organisations.map((id) => ({ oid: id })),
      },
    },
  });

  revalidatePath("/categories");
  redirect("/categories");
};

export const updateCategoryAction = async (
  prevFormData: any,
  formData: FormData
) => {
  const updateData = {
    cat_name: formData.get("cat_name"),
    organisations: formData.getAll("organisations").map((id) => Number(id)), // Convert to numbers
  };

  const cat_id = formData.get("cat_id") as string;

  const validation = validateSchemaRedirect(CategoryFormSchema, updateData);
  if (validation) {
    return validation;
  }

  await prisma.problemCategory.update({
    where: {
      cat_id: +cat_id,
    },
    data: {
      cat_name: updateData.cat_name as string,
      organisations: {
        set: updateData.organisations.map((id) => ({ oid: id })),
      },
    },
  });

  revalidatePath("/categories");
  redirect("/categories");
};

export const cloneCategoryByIdAction = async (id: number) => {
  try {
    const category = await getCategoryById(id);

    if (!category) {
      throw new Error(`Kategorija sa ID-om ${id} nije pronađena.`);
    }

    const clonedCategory = await prisma.problemCategory.create({
      data: {
        cat_name: `Clone - ${category.cat_name}`,
      },
    });
    revalidatePath("/categories");

    return clonedCategory;
  } catch (error: unknown) {
    handleError(error, {
      customMessage: `Greška prilikom kloniranja kategorije.`,
      throwError: true,
    });
  }
};

export const deleteCategoryByIdAction = async (id: number) => {
  try {
    // Disconnect organisations first
    await prisma.problemCategory.update({
      where: {
        cat_id: id,
      },
      data: {
        organisations: {
          set: [], // Unlink all associated organisations
        },
      },
    });

    // // Delete the category
    await prisma.problemCategory.delete({
      where: {
        cat_id: id,
      },
    });

    revalidatePath("/categories");
  } catch (error: unknown) {
    handleError(error, {
      customMessage: `Greška prilikom brisanja kategorije.`,
      throwError: true,
    });
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getCategoryById } from "@/app/_utils/api_utils/categories";
import prisma from "@/app/_utils/db/db";
import { CategoryFormSchema } from "@/app/_utils/zod/categorySchemas";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const cloneCategoryByIdAction = async (id: number) => {
  try {
    // Fetch the category to be cloned
    const category = await getCategoryById(id);

    if (!category) {
      throw new Error(`Kategorija sa ID-om ${id} nije pronađena.`);
    }

    // Create the new category with a modified name
    const clonedCategory = await prisma.problemCategory.create({
      data: {
        cat_name: `Clone - ${category.cat_name}`,
      },
    });
    revalidatePath("/categories");

    return clonedCategory;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(
        `Greška prilikom kloniranja kategorije: ${error.message}`
      );
    }
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

    // Delete the category
    await prisma.problemCategory.delete({
      where: {
        cat_id: id,
      },
    });

    revalidatePath("/categories");
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Greška prilikom brisanja kategorije: ${error.message}`);
    }
  }
};

//const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const addNewCategoryAction = async (
  prevFormData: any,
  formData: FormData
) => {
  // await wait(15000);

  const data = {
    cat_name: formData.get("cat_name"),
    organisations: formData.getAll("organisations").map((id) => Number(id)), // Convert to numbers
  };

  const validation = CategoryFormSchema.safeParse(data);
  if (!validation.success) {
    const errors = validation.error.issues.map(
      (issue: { message: string }) => issue.message
    );

    return errors as string[];
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

  const validation = CategoryFormSchema.safeParse(updateData);
  if (!validation.success) {
    const errors = validation.error.issues.map(
      (issue: { message: string }) => issue.message
    );
    return errors as string[];
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

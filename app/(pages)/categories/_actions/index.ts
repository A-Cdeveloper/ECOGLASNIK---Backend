"use server";

import { getCategoryById } from "@/app/_utils/api_utils/categories";
import prisma from "@/app/_utils/db/db";
import { revalidatePath } from "next/cache";

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

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addNewCategoryAction = async (formData: FormData) => {
  console.log(formData);
  // const newCat = {
  //   cat_id: 999,
  //   cat_name: formData.get("cat_name"),
  //   // Sluzbe: formData.getAll("organisations"),
  // };

  // try {
  //   const newCategory = await prisma.problemCategory.create({
  //     data: newCat,
  //   });
  //   revalidatePath("/categories");
  //   return newCategory;
  // } catch (error: unknown) {
  //   if (error instanceof Error) {
  //     throw new Error(`Greška prilikom dodavanja kategorije`);
  //   }
  // }
};

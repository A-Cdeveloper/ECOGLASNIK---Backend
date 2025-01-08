/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "../db/db";
import { sortByPropertyLength } from "../helpers";

export const getAllCategories = async (sortBy: string = "cat_id-asc") => {
  const [field, order] = sortBy.split("-") as [string, "asc" | "desc"];

  // Ensure valid sorting inputs
  const validFields = ["cat_id", "cat_name", "problems_count"]; // Add more valid fields as needed
  const validOrder = ["asc", "desc"];

  if (!validFields.includes(field) || !validOrder.includes(order)) {
    throw new Error("Invalid sorting parameters.");
  }

  try {
    if (field === "problems_count") {
      // Sort by the number of problems
      const categories = await prisma.problemCategory.findMany({
        include: {
          organisations: {
            select: {
              oid: true,
              organisation_name: true,
            },
          },
          problems: {
            select: {
              title: true,
            },
          },
        },
      });

      return sortByPropertyLength(categories, "problems", order);
    } else {
      // Sort by regular fields (e.g., cat_name)
      const categories = await prisma.problemCategory.findMany({
        orderBy: {
          [field]: order, // Dynamically set sorting field and order
        },
        include: {
          organisations: {
            select: {
              oid: true,
              organisation_name: true,
            },
          },
          problems: {
            select: {
              title: true,
            },
          },
        },
      });

      return categories;
    }
  } catch (error: unknown) {
    console.log(error);
    if (error instanceof Error) {
      throw new Error(`Greška prilikom preuzimanja kategorija.`);
    }
  }
};

/////////////////////////
export const getCategoryById = async (id: number) => {
  try {
    const category = await prisma.problemCategory.findUnique({
      where: {
        cat_id: id,
      },
      include: {
        organisations: true,
        problems: true,
      },
    });
    return category;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Greška prilikom preuzimanja kategorije`);
    }
  }
};

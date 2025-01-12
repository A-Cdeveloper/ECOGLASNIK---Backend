/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "../db/db";
//import { sortByPropertyLength } from "../helpers";

export const getAllProblems = async (
  sortBy: string = "createdAt-desc",
  status?: string,
  category?: string
) => {
  const [field, order] = sortBy.split("-") as [string, "asc" | "desc"];

  // Ensure valid sorting inputs
  const validFields = ["title", "createdAt"]; // Add more valid fields as needed
  const validOrder = ["asc", "desc"];

  if (!validFields.includes(field) || !validOrder.includes(order)) {
    throw new Error("Invalid sorting parameters.");
  }

  try {
    const whereClause =
      status || category
        ? {
            ...(status && { status: status.toLowerCase() }),
            ...(category && { category: { cat_id: +category } }),
          }
        : undefined;

    const problems = await prisma.problem.findMany({
      where: whereClause,
      orderBy: {
        [field]: order, // Dynamically set sorting field and order
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true,
        status: true,
        image: true,
        category: {
          select: {
            cat_id: true,
            cat_name: true,
          },
        },
      },
    });

    return problems;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Greška prilikom preuzimanja problema.`);
    }
  }
};

/////////////////////////
export const getProblemById = async (id: string) => {
  try {
    const problem = await prisma.problem.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        status: true,
        image: true,
        position: true,
        category: {
          select: {
            cat_id: true,
            cat_name: true,
          },
        },
        user: {
          select: {
            uid: true,
            firstname: true,
            lastname: true,
            email: true,
          },
        },
      },
    });
    return problem;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Greška prilikom preuzimanja kategorije`);
    }
  }
};

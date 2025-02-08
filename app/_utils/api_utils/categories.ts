/* eslint-disable @typescript-eslint/no-explicit-any */
import tailwindConfig from "@/tailwind.config";
import { MAX_PAGE_SIZE } from "../contants";
import prisma from "../db/db";
import { sortByPropertyLength } from "../helpers";

export const getAllCategories = async (
  sortBy: string = "cat_id-asc",
  startIndex?: number,
  pageSize: number = 1000
) => {
  const [field, order] = sortBy.split("-") as [string, "asc" | "desc"];

  // Ensure valid sorting inputs
  const validFields = ["cat_id", "cat_name", "problems_count"]; // Add more valid fields as needed
  const validOrder = ["asc", "desc"];

  if (!validFields.includes(field) || !validOrder.includes(order)) {
    throw new Error("Invalid sorting parameters.");
  }

  try {
    if (field === "problems_count") {
      const [categories, totalCategories] = await Promise.all([
        prisma.problemCategory.findMany({
          skip: startIndex || 0,
          take: pageSize || MAX_PAGE_SIZE,
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
                status: true,
                officialEmail: true,
              },
            },
          },
        }),
        prisma.problemCategory.count(),
      ]);

      const categoriesFiltered = sortByPropertyLength(
        categories,
        "problems",
        order
      );

      return { categories: categoriesFiltered, totalCategories };
    } else {
      const [categories, totalCategories] = await Promise.all([
        prisma.problemCategory.findMany({
          orderBy: {
            [field]: order, // Dynamically set sorting field and order
          },
          skip: startIndex || 0,
          take: pageSize || MAX_PAGE_SIZE,
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
                status: true,
                officialEmail: true,
              },
            },
          },
        }),
        prisma.problemCategory.count(),
      ]);

      return { categories, totalCategories };
    }
  } catch (error: unknown) {
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

export const getAllCategoriesProblems = async () => {
  try {
    const categories = await prisma.problemCategory.findMany({
      select: {
        cat_id: true,
        cat_name: true,
        problems: {
          where: {
            status: {
              not: "archive", // Exclude archived problems
            },
          },
          select: {
            id: true, // Fetch problem IDs to count them
          },
        },
      },
    });

    // Compute problem counts
    const categoriesWithProblemCounts = categories.map((category, index) => {
      const color = `hsl(${index * 5}, 50%, 60%)`;
      return {
        name: category.cat_name,
        value: category.problems.length, // Number of problems
        color,
      };
    });

    return categoriesWithProblemCounts;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Greška.`);
    }
  }
};

export const getSingleCategoryProblems = async (id: number) => {
  try {
    const category = await prisma.problemCategory.findUnique({
      where: {
        cat_id: id,
      },

      select: {
        problems: {
          where: {
            status: {
              not: "archive", // Exclude problems with status "archive"
            },
          },
          select: {
            id: true,
            status: true, // Fetch status of each problem
          },
        },
      },
    });

    if (!category) {
      throw new Error(`category with ID ${id} not found.`);
    }

    // // Flatten problems into one array
    // const allProblems = category.problems.flatMap(
    //   (category) => category.problems
    // );

    // // // Count problems by status
    const statusCounts = category.problems.reduce(
      (acc, problem) => {
        acc[problem.status] = (acc[problem.status] || 0) + 1;
        return acc;
      },
      { active: 0, done: 0 } as Record<string, number>
    );

    // // // Total problems
    const totalProblems = statusCounts.active + statusCounts.done;

    // // // Calculate percentages
    const getPercentage = (count: number) =>
      totalProblems > 0 ? ((count / totalProblems) * 100).toFixed(2) : "0";

    // // // Nivo Pie formatted data
    const pieData = [
      {
        name: `AKTIVNI`,
        value: statusCounts.active,
        percent: getPercentage(statusCounts.active),
        color: tailwindConfig.theme.extend.colors.danger["200"],
      },
      {
        name: `REŠENI`,
        value: statusCounts.done,
        percent: getPercentage(statusCounts.done),
        color: tailwindConfig.theme.extend.colors.turquoise["100"],
      },
    ];

    return pieData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error fetching category problems: ${error.message}`);
    }
  }
};

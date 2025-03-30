/* eslint-disable @typescript-eslint/no-explicit-any */
import tailwindConfig from "@/tailwind.config";
import { MAX_PAGE_SIZE } from "@/app/config";
import prisma from "../db/db";
import { getPercentage, sortByPropertyLength } from "../helpers";
import { ProblemStatus } from "@prisma/client";
import { t } from "../messages";

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
    throw new Error(t("invalid_sort"));
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
      throw new Error(t("category.no_categories_found"));
    }
  }
};

/////////////////////////
export const getCategoryById = async (
  id: number,
  startIndex?: number,
  pageSize?: number
) => {
  try {
    const category = await prisma.problemCategory.findUnique({
      where: {
        cat_id: id,
      },
      include: {
        organisations: {
          select: {
            oid: true,
            organisation_name: true,
          },
        },
        problems: {
          skip: startIndex || 0,
          take: pageSize || MAX_PAGE_SIZE,
          where: {
            status: { not: ProblemStatus.ARCHIVE }, // ✅ Fetch only non-archived problems
          },
        },
      },
    });

    const allProblems = await prisma.problem.findMany({
      where: {
        cat_id: id,
        status: { not: ProblemStatus.ARCHIVE },
      },
    });

    return { ...category, allProblems };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(t("category.no_category_found"));
    }
  }
};

export const getAllCategoriesProblemsForChart = async () => {
  try {
    const categories = await prisma.problemCategory.findMany({
      select: {
        cat_id: true,
        cat_name: true,
        problems: {
          where: {
            status: {
              not: ProblemStatus.ARCHIVE, // Exclude archived problems
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

export const getSingleCategoryProblemsForChart = async (id: number) => {
  try {
    const category = await prisma.problemCategory.findUnique({
      where: { cat_id: id },
      select: {
        problems: {
          where: { status: { not: ProblemStatus.ARCHIVE } },
          select: {
            id: true,
            status: true, // Fetch status of each problem
          },
        },
      },
    });

    if (!category) {
      throw new Error(`Category with ID ${id} not found.`);
    }

    // Count problems by status
    const statusCounts = category.problems.reduce(
      (acc, problem) => {
        acc[problem.status] = (acc[problem.status] || 0) + 1;
        return acc;
      },
      {
        [ProblemStatus.ACTIVE]: 0,
        [ProblemStatus.DONE]: 0,
        [ProblemStatus.WAITING]: 0,
      } as Record<ProblemStatus, number>
    );

    // Total problems
    const totalProblems =
      statusCounts[ProblemStatus.ACTIVE] +
      statusCounts[ProblemStatus.DONE] +
      statusCounts[ProblemStatus.WAITING];

    // Nivo Pie formatted data
    const pieData = [
      {
        name: "OBRADA",
        value: statusCounts[ProblemStatus.WAITING],
        percent: getPercentage(
          statusCounts[ProblemStatus.WAITING],
          totalProblems
        ),
        color: tailwindConfig.theme.extend.colors.skyblue["200"],
      },
      {
        name: "AKTIVNI",
        value: statusCounts[ProblemStatus.ACTIVE],
        percent: getPercentage(
          statusCounts[ProblemStatus.ACTIVE],
          totalProblems
        ),
        color: tailwindConfig.theme.extend.colors.danger["200"],
      },
      {
        name: "REŠENI",
        value: statusCounts[ProblemStatus.DONE],
        percent: getPercentage(statusCounts[ProblemStatus.DONE], totalProblems),
        color: tailwindConfig.theme.extend.colors.success["200"],
      },
    ];

    return pieData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error fetching category problems: ${error.message}`);
    }
  }
};

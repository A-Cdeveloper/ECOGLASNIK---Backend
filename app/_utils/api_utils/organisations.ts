import { MAX_PAGE_SIZE } from "@/app/config";
import prisma from "../db/db";
import tailwindConfig from "../../../tailwind.config";
import { ProblemStatus } from "@prisma/client";
import { getPercentage } from "../helpers";
import { t } from "../messages";

export const getAllOrganisations = async (
  sortBy: string = "oid-asc",
  startIndex?: number,
  pageSize: number = 1000
) => {
  const [field, order] = sortBy.split("-");

  // Ensure valid sorting inputs
  const validFields = ["oid", "organisation_name"]; // Add more valid fields as needed
  const validOrder = ["asc", "desc"];

  if (!validFields.includes(field) || !validOrder.includes(order)) {
    throw new Error(t("invalid_sort"));
  }

  try {
    const [organisations, totalOrganisations] = await Promise.all([
      prisma.organisation.findMany({
        orderBy: {
          [field]: order, // Dynamically set sorting field and order
        },
        skip: startIndex || 0,
        take: pageSize || MAX_PAGE_SIZE,
        include: {
          categories: true,
        },
      }),
      prisma.organisation.count(),
    ]);

    return { organisations, totalOrganisations };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(t("organisations.no_organisations_found"));
    }
  }
};

export const getOrganisation = async (oid?: string) => {
  try {
    const organisation = await prisma.organisation.findFirst({
      where: oid ? { oid: +oid } : undefined,
      include: {
        categories: {
          include: {
            problems: true, // Fetch problems from each category
          },
        },
      },
    });
    return organisation;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(t("organisations.no_organisation_found"));
    }
  }
};

export const getOrganisationsByCategory = async (cat_id: string) => {
  try {
    const organisations = await prisma.organisation.findMany({
      where: {
        categories: {
          some: { cat_id: +cat_id },
        },
      },
      select: {
        organisation_name: true,
        organisation_email: true, // Example field
        categories: {
          where: {
            cat_id: +cat_id,
          },
          select: {
            cat_name: true,
          },
        },
      },
    });

    return organisations;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(
        `Greška prilikom preuzimanja organizacija za kategoriju.`
      );
    }
  }
};

export const getAllOrganisationsProblemsForCharts = async () => {
  try {
    const organisations = await prisma.organisation.findMany({
      select: {
        oid: true,
        organisation_name: true,
        categories: {
          select: {
            problems: {
              where: {
                status: {
                  not: ProblemStatus.ARCHIVE,
                },
              },
              select: {
                id: true, // Fetch problem IDs to enable counting
              },
            },
          },
        },
      },
    });

    const organisationsWithProblemCounts = organisations.map((org, index) => {
      const value = org.categories.reduce((sum, category) => {
        return sum + category.problems.length;
      }, 0);

      const color = `hsl(${index * 15}, 50%, 60%)`;

      return {
        name: org.organisation_name,
        value,
        color,
      };
    });

    return organisationsWithProblemCounts;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Greška.`);
    }
  }
};

export const getOrganisationProblemsForCharts = async (oid?: number) => {
  try {
    const organisation = await prisma.organisation.findFirst({
      where: oid ? { oid } : undefined,
      select: {
        organisation_name: true,
        categories: {
          select: {
            problems: {
              where: {
                status: {
                  not: ProblemStatus.ARCHIVE,
                },
              },
              select: {
                id: true,
                status: true, // Fetch status of each problem
              },
            },
          },
        },
      },
    });

    if (!organisation) {
      throw new Error(`Organisation not found.`);
    }

    // Flatten problems into one array
    const allProblems = organisation.categories.flatMap(
      (category) => category.problems
    );

    // Count problems by status
    const statusCounts = allProblems.reduce(
      (acc, problem) => {
        if (problem.status !== ProblemStatus.ARCHIVE) {
          acc[problem.status as keyof typeof acc] += 1;
        }
        return acc;
      },
      {
        [ProblemStatus.ACTIVE]: 0,
        [ProblemStatus.DONE]: 0,
        [ProblemStatus.WAITING]: 0,
      }
    );

    // Total problems
    const totalProblems =
      statusCounts.ACTIVE + statusCounts.DONE + statusCounts.WAITING;

    // Nivo Pie formatted data
    const pieData = [
      {
        name: `U OBRADI`,
        value: statusCounts.WAITING,
        percent: getPercentage(statusCounts.WAITING, totalProblems),
        color: tailwindConfig.theme.extend.colors.skyblue["200"],
      },
      {
        name: `AKTIVNI`,
        value: statusCounts.ACTIVE,
        percent: getPercentage(statusCounts.ACTIVE, totalProblems),
        color: tailwindConfig.theme.extend.colors.danger["200"],
      },
      {
        name: `REŠENI`,
        value: statusCounts.DONE,
        percent: getPercentage(statusCounts.DONE, totalProblems),
        color: tailwindConfig.theme.extend.colors.success["200"],
      },
    ];

    return pieData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error fetching organisation problems: ${error.message}`);
    }
  }
};

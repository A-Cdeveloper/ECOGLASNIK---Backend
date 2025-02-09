import { MAX_PAGE_SIZE } from "@/app/config";
import prisma from "../db/db";
import tailwindConfig from "../../../tailwind.config";

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
    throw new Error("Invalid sorting parameters.");
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
      throw new Error(`Greška prilikom preuzimanja nadležnih organizacija.`);
    }
  }
};

export const getOrganisation = async (oid: string) => {
  try {
    const organisation = await prisma.organisation.findUnique({
      where: {
        oid: +oid,
      },
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
      throw new Error(`Greška prilikom preuzimanja nadležne službe.`);
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

export const getAllOrganisationsProblems = async () => {
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
                  not: "archive", // Exclude problems with status "archive"
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

export const getOrganisationProblems = async (oid: number) => {
  try {
    const organisation = await prisma.organisation.findUnique({
      where: { oid },
      select: {
        organisation_name: true,
        categories: {
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
        },
      },
    });

    if (!organisation) {
      throw new Error(`Organisation with ID ${oid} not found.`);
    }

    // Flatten problems into one array
    const allProblems = organisation.categories.flatMap(
      (category) => category.problems
    );

    // Count problems by status
    const statusCounts = allProblems.reduce(
      (acc, problem) => {
        acc[problem.status] = (acc[problem.status] || 0) + 1;
        return acc;
      },
      { active: 0, done: 0, waiting: 0 } as Record<string, number>
    );

    // Total problems
    const totalProblems = statusCounts.active + statusCounts.done;

    // Calculate percentages
    const getPercentage = (count: number) =>
      totalProblems > 0 ? ((count / totalProblems) * 100).toFixed(2) : "0";

    // Nivo Pie formatted data
    const pieData = [
      {
        name: `U OBRADI`,
        value: statusCounts.waiting,
        percent: getPercentage(statusCounts.waiting),
        color: tailwindConfig.theme.extend.colors.skyblue["200"],
      },
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

import prisma from "@/app/_utils/db/db";
//import { wait } from "@/app/_utils/helpers";
import { ProblemOfficialEmail, ProblemStatus } from "@prisma/client";

export const getAllOrganisationsProblemsReport = async (
  startDate: Date,
  endDate: Date
) => {
  try {
    const organisations = await prisma.organisation.findMany({
      select: {
        oid: true,
        organisation_name: true,
        categories: {
          select: {
            problems: {
              where: {
                status: { not: ProblemStatus.ARCHIVE },
                createdAt: { gte: startDate, lte: endDate },
              },
              select: {
                status: true,
                officialEmail: true,
              },
            },
          },
        },
      },
    });

    const organisationsWithProblemCounts = organisations.map((org) => {
      const problems = org.categories.flatMap((category) => category.problems);

      const problemsCounts = {
        total: problems.length,
        [ProblemStatus.ACTIVE]: problems.filter(
          (p) => p.status === ProblemStatus.ACTIVE
        ).length,
        [ProblemStatus.DONE]: problems.filter(
          (p) => p.status === ProblemStatus.DONE
        ).length,
        [ProblemStatus.WAITING]: problems.filter(
          (p) => p.status === ProblemStatus.WAITING
        ).length,
        [ProblemOfficialEmail.SENT]: problems.filter(
          (p) => p.officialEmail === ProblemOfficialEmail.SENT
        ).length,
        officialDone: problems.filter(
          (p) =>
            p.officialEmail === ProblemOfficialEmail.SENT &&
            p.status === ProblemStatus.DONE
        ).length,
      };

      return {
        name: org.organisation_name,
        problemsCounts,
      };
    });

    return { startDate, endDate, organisationsWithProblemCounts };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Greška.`);
    }
  }
};

export const getAllCategoriesProblemsReport = async (
  startDate: Date,
  endDate: Date
) => {
  try {
    const categories = await prisma.problemCategory.findMany({
      select: {
        cat_name: true,
        problems: {
          where: {
            status: { not: ProblemStatus.ARCHIVE },
            createdAt: { gte: startDate, lte: endDate },
          },
          select: {
            status: true,
            officialEmail: true,
          },
        },
      },
    });

    const categoriesWithProblemCounts = categories.map((cat) => {
      const problems = cat.problems;

      const problemsCounts = {
        total: problems.length,
        [ProblemStatus.ACTIVE]: problems.filter(
          (p) => p.status === ProblemStatus.ACTIVE
        ).length,
        [ProblemStatus.DONE]: problems.filter(
          (p) => p.status === ProblemStatus.DONE
        ).length,
        [ProblemStatus.WAITING]: problems.filter(
          (p) => p.status === ProblemStatus.WAITING
        ).length,
        [ProblemOfficialEmail.SENT]: problems.filter(
          (p) => p.officialEmail === ProblemOfficialEmail.SENT
        ).length,
        officialDone: problems.filter(
          (p) =>
            p.officialEmail === ProblemOfficialEmail.SENT &&
            p.status === ProblemStatus.DONE
        ).length,
      };

      return {
        name: cat.cat_name,
        problemsCounts,
      };
    });

    return { startDate, endDate, categoriesWithProblemCounts };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Greška.`);
    }
  }
};

export const getSingleOrganisationProblemsReport = async (
  startDate: Date,
  endDate: Date,
  organisationId?: string
) => {
  try {
    const organisation = await prisma.organisation.findUnique({
      where: {
        oid: Number(organisationId) || 1,
      },
      select: {
        oid: true,
        categories: {
          select: {
            problems: {
              where: {
                status: { not: ProblemStatus.ARCHIVE },
                createdAt: { gte: startDate, lte: endDate },
              },
              select: {
                id: true,
                title: true,
                status: true,
                createdAt: true,
                updatedAt: true,
                officialEmail: true,
              },
              orderBy: {
                createdAt: "desc",
              },
            },
          },
        },
      },
    });

    const organisationProblems =
      organisation?.categories.flatMap((category) => category.problems) || [];

    return {
      startDate,
      endDate,
      organisationProblems,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Greška.`);
    }
  }
};

export const getSingleOrganisationCategoriesReport = async (
  startDate: Date,
  endDate: Date,
  organisationId?: string
) => {
  try {
    const organisation = await prisma.organisation.findUnique({
      where: {
        oid: Number(organisationId) || 1,
      },

      select: {
        oid: true,
        organisation_name: true,
        categories: {
          select: {
            cat_id: true,
            cat_name: true,
            problems: {
              where: {
                status: { not: ProblemStatus.ARCHIVE },
                createdAt: { gte: startDate, lte: endDate },
              },
              select: {
                id: true,
                title: true,
                status: true,
                createdAt: true,
                updatedAt: true,
                officialEmail: true,
              },
              orderBy: {
                createdAt: "desc",
              },
            },
          },
        },
      },
    });

    const categoriesWithProblemCounts = organisation?.categories.map((cat) => {
      const problemsCounts = cat.problems.reduce(
        (acc, problem) => {
          if (ProblemStatus.ARCHIVE === problem.status) return acc;
          acc.total++;
          acc[problem.status]++;

          if (problem.officialEmail === ProblemOfficialEmail.SENT) {
            acc[ProblemOfficialEmail.SENT]++;
          }
          if (
            problem.officialEmail === ProblemOfficialEmail.SENT &&
            problem.status === ProblemStatus.DONE
          ) {
            acc.officialDone++;
          }

          return acc;
        },
        {
          total: 0,
          [ProblemStatus.ACTIVE]: 0,
          [ProblemStatus.DONE]: 0,
          [ProblemStatus.WAITING]: 0,
          [ProblemOfficialEmail.SENT]: 0,
          officialDone: 0,
        }
      );

      return {
        name: cat.cat_name,
        problemsCounts,
      };
    });

    return {
      startDate,
      endDate,
      categoriesWithProblemCounts,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Greška.`);
    }
  }
};

export const getSingleCategoryProblemsReport = async (
  startDate: Date,
  endDate: Date,
  categoryId?: string
) => {
  try {
    const problems = await prisma.problem.findMany({
      where: {
        status: {
          not: ProblemStatus.ARCHIVE,
        },
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
        ...(categoryId
          ? { category: { cat_id: Number(categoryId) || 1 } }
          : {}), // If no categoryId, fetch all problems
      },
      select: {
        id: true,
        title: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        officialEmail: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      startDate,
      endDate,
      categoryProblems: problems,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Greška.`);
    }
  }
};

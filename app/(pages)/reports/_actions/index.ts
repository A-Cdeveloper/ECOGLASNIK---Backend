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
                status: {
                  not: ProblemStatus.ARCHIVE,
                },
              },
              select: {
                id: true,
                status: true,
                createdAt: true,
                officialEmail: true,
              },
            },
          },
        },
      },
    });

    const organisationsWithProblemCounts = organisations.map((org) => {
      const problemsCounts = org.categories.reduce(
        (acc, category) => {
          category.problems.forEach((problem) => {
            if (problem.status === ProblemStatus.ARCHIVE) return;

            const problemDate = new Date(problem.createdAt);

            if (
              !isNaN(problemDate.getTime()) &&
              problemDate >= startDate &&
              problemDate <= endDate
            ) {
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
            }
          });
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
        name: org.organisation_name,
        problemsCounts,
      };
    });

    return {
      startDate,
      endDate,
      organisationsWithProblemCounts,
    };
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
            status: {
              not: ProblemStatus.ARCHIVE, // Exclude archived problems
            },
          },
          select: {
            id: true,
            status: true,
            officialEmail: true,
            createdAt: true,
          },
        },
      },
    });

    const categoriesWithProblemCounts = categories.map((cat) => {
      const problemsCounts = cat.problems.reduce(
        (acc, problem) => {
          if (problem.status === ProblemStatus.ARCHIVE) return acc;

          const problemDate = new Date(problem.createdAt);

          if (
            !isNaN(problemDate.getTime()) &&
            problemDate >= startDate &&
            problemDate <= endDate
          ) {
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
              select: {
                id: true,
                title: true,
                status: true,
                createdAt: true,
                updatedAt: true,
                officialEmail: true,
              },
              where: {
                status: {
                  not: ProblemStatus.ARCHIVE,
                },
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
      organisation?.categories
        .flatMap((category) => {
          return category.problems.filter((problem) => {
            const problemDate = new Date(problem.createdAt);
            return (
              !isNaN(problemDate.getTime()) &&
              problemDate >= startDate &&
              problemDate <= endDate
            );
          });
        })
        ?.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ) || [];

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
              select: {
                id: true,
                title: true,
                status: true,
                createdAt: true,
                updatedAt: true,
                officialEmail: true,
              },
              where: {
                status: {
                  not: ProblemStatus.ARCHIVE,
                },
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
          if (problem.status === ProblemStatus.ARCHIVE) return acc;

          const problemDate = new Date(problem.createdAt);

          if (
            !isNaN(problemDate.getTime()) &&
            problemDate >= startDate &&
            problemDate <= endDate
          ) {
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
  if (!categoryId) return;
  try {
    const category = await prisma.problemCategory.findUnique({
      where: {
        cat_id: Number(categoryId) || 1,
      },

      select: {
        problems: {
          select: {
            id: true,
            title: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            officialEmail: true,
          },
          where: {
            status: {
              not: ProblemStatus.ARCHIVE,
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    const categoryProblems =
      category?.problems.filter((problem) => {
        const problemDate = new Date(problem.createdAt);
        return (
          !isNaN(problemDate.getTime()) &&
          problemDate >= startDate &&
          problemDate <= endDate
        );
      }) || [];

    return {
      startDate,
      endDate,
      categoryProblems,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Greška.`);
    }
  }
};

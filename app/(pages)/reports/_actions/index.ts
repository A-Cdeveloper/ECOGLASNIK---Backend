import prisma from "@/app/_utils/db/db";
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

            // Ensure `createdAt` is a valid date before filtering
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

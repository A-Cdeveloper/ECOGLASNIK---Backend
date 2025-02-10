/* eslint-disable @typescript-eslint/no-explicit-any */
import { compareAsc, format, parse, subDays } from "date-fns";
import { MAX_PAGE_SIZE } from "@/app/config";
import prisma from "../db/db";
import { ProblemStatus } from "@prisma/client";

//import { sortByPropertyLength } from "../helpers";

export const getAllProblems = async (
  sortBy: string = "createdAt-desc",
  status?: ProblemStatus,
  category?: string,
  days?: number,
  startIndex?: number,
  pageSize?: number
) => {
  const [field, order] = sortBy.split("-") as [string, "asc" | "desc"];

  const whereClause =
    status || category || days
      ? {
          ...(status && { status: status }),
          ...(category && { category: { cat_id: +category } }),
          ...(days && { createdAt: { gte: subDays(new Date(), days) } }),
        }
      : { status: { not: ProblemStatus.ARCHIVE } };

  try {
    const [problems, totalProblems] = await Promise.all([
      prisma.problem.findMany({
        where: whereClause,
        orderBy: {
          [field]: order,
        },
        skip: startIndex || 0,
        take: pageSize || MAX_PAGE_SIZE,
        select: {
          id: true,
          title: true,
          createdAt: true,
          updatedAt: true,
          status: true,
          image: true,
          officialEmail: true,
          category: {
            select: {
              cat_id: true,
              cat_name: true,
            },
          },
        },
      }),
      prisma.problem.count({
        where: whereClause,
      }),
    ]);

    return { problems, totalProblems };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Greška prilikom preuzimanja problema`);
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
        officialEmail: true,
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
      throw new Error(`Greška prilikom preuzimanja problema`);
    }
  }
};

export const getProblemTrends = async (days: number = 7) => {
  const endDate = new Date();
  const startDate = subDays(endDate, days);

  try {
    // Fetch problems created within the date range
    const problems = await prisma.problem.findMany({
      where: {
        createdAt: { gte: startDate, lte: endDate },
        NOT: { status: ProblemStatus.ARCHIVE },
      },
      select: {
        id: true,
        createdAt: true,
        status: true,
      },
    });

    // Initialize trends with all days set to zero
    const trends: Record<
      string,
      { aktivni: number; reseni: number; odrada: number }
    > = {};
    for (let i = 0; i <= days; i++) {
      const dateKey = format(subDays(endDate, i), "dd.MM.yyyy");
      trends[dateKey] = { aktivni: 0, reseni: 0, odrada: 0 };
    }

    // Process problems based on createdAt
    problems.forEach((p) => {
      const createdDateKey = format(p.createdAt, "dd.MM.yyyy");
      if (trends[createdDateKey]) {
        if (p.status === ProblemStatus.ACTIVE) {
          trends[createdDateKey].aktivni += 1;
        }

        if (p.status === ProblemStatus.DONE) {
          trends[createdDateKey].reseni += 1;
        }
        if (p.status === ProblemStatus.WAITING) {
          trends[createdDateKey].odrada += 1;
        }
      }
    });

    // Convert trends object to sorted array
    return Object.entries(trends)
      .map(([date, counts]) => ({ date, ...counts }))
      .sort((a, b) =>
        compareAsc(
          parse(a.date, "dd.MM.yyyy", new Date()),
          parse(b.date, "dd.MM.yyyy", new Date())
        )
      );
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Greška prilikom preuzimanja podataka: ${error.message}`);
    }
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { subDays } from "date-fns";
import { MAX_PAGE_SIZE } from "../contants";
import prisma from "../db/db";
//import { sortByPropertyLength } from "../helpers";

export const getAllProblems = async (
  sortBy: string = "createdAt-desc",
  status?: string,
  category?: string,
  days?: number,
  startIndex?: number,
  pageSize?: number
) => {
  const [field, order] = sortBy.split("-") as [string, "asc" | "desc"];

  const whereClause =
    status || category || days
      ? {
          ...(status && { status: status.toLowerCase() }),
          ...(category && { category: { cat_id: +category } }),
          ...(days && { createdAt: { gte: subDays(new Date(), days) } }),
        }
      : undefined;

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

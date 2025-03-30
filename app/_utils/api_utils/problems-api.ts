/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "../db/db";
import { t } from "../messages";

export const getAllProblems = async (conditions: any, orderBy: any) => {
  try {
    const problems = await prisma.problem.findMany({
      where: conditions,
      orderBy,
    });
    return problems;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(t("problems.no_problems_found"));
    }
  }
};

export const getProblemById = async (id: string, include?: any) => {
  try {
    const problem = await prisma.problem.findUnique({
      where: {
        id,
      },
      include,
    });

    return problem;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(t("problems.no_problem_found"));
    }
  }
};

export const addNewProblem = async (recivedData: any) => {
  try {
    const newProblem = await prisma.problem.create({
      data: recivedData,
    });
    return newProblem;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(t("problems.add_problem_error"));
    }
  }
};

export const updateProblem = async (id: string, data: any) => {
  try {
    const updatedProblem = await prisma.problem.update({
      where: {
        id,
      },
      data,
    });
    return updatedProblem;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(t("problems.edit_problem_error"));
    }
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "../db/db";

export const getAllProblems = async (conditions: any, orderBy: any) => {
  try {
    const problems = await prisma.problem.findMany({
      where: conditions,
      orderBy,
    });
    return problems;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Greška prilikom preuzimanja problema`);
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
      throw new Error(`Greška prilikom preuzimanja problema`);
    }
  }
};

export const addNewProblem = async (data: any) => {
  try {
    const newProblem = await prisma.problem.create({
      data,
    });
    return newProblem;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Greška prilikom dodavanja problema`);
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
      throw new Error(`Greška prilikom azuriranja problema`);
    }
  }
};

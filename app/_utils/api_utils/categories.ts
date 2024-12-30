import prisma from "../db/db";

export const getAllCategories = async () => {
  try {
    const categories = await prisma.problemCategory.findMany({
      orderBy: {
        cat_id: "asc",
      },
      include: {
        organisations: true,
        problems: true,
      },
    });
    return categories;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Greška prilikom preuzimanja kategorija`);
    }
  }
};

export const getCategoryById = async (id: number) => {
  try {
    const category = await prisma.problemCategory.findUnique({
      where: {
        cat_id: id,
      },
      include: {
        organisations: true,
        problems: true,
      },
    });
    return category;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Greška prilikom preuzimanja kategorije`);
    }
  }
};

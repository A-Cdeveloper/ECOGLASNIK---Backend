import { MAX_PAGE_SIZE } from "../contants";
import prisma from "../db/db";

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

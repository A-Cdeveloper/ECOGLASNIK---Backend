import prisma from "../db/db";

export const getAllOrganisations = async (sortBy: string = "oid-asc") => {
  const [field, order] = sortBy.split("-");

  // Ensure valid sorting inputs
  const validFields = ["oid", "organisation_name"]; // Add more valid fields as needed
  const validOrder = ["asc", "desc"];

  if (!validFields.includes(field) || !validOrder.includes(order)) {
    throw new Error("Invalid sorting parameters.");
  }

  try {
    const organisations = await prisma.organisation.findMany({
      orderBy: {
        [field]: order, // Dynamically set sorting field and order
      },
      include: {
        categories: true,
      },
    });

    return organisations;
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
        categories: true,
      },
    });
    return organisation;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Greška prilikom preuzimanja nadležne službe.`);
    }
  }
};

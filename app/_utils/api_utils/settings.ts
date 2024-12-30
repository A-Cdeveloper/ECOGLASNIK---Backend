import prisma from "../db/db";

export const getSettings = async () => {
  try {
    const settings = await prisma.settings.findFirst({
      where: {
        id: 1,
      },
    });

    return settings;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Izvinjavamo se.
        Došlo je do greške prilikom pokretanja aplikacije.`);
    }
  }
};

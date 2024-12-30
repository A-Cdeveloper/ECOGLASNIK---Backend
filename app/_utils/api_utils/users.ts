import prisma from "../db/db";

export const getSuperAdmin = async (adminId: number) => {
  try {
    const superadmin = await prisma.user.findUnique({
      where: {
        uid: adminId,
        role: "superadmin",
      },
    });
    return superadmin;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error();
    }
  }
};

export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany();

    return users;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error();
    }
  }
};

export const getUserById = async (id: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        uid: id,
      },
      select: {
        uid: true,
        firstname: true,
        lastname: true,
        email: true,
        phone: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Greška prilikom preuzimanja korisnika`);
    }
  }
};

export const deleteUser = async (id: number) => {
  try {
    const user = await prisma.user.delete({
      where: {
        uid: id,
      },
    });
    return user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Greška prilikom brisanja korisnika`);
    }
  }
};

import prisma from "../db/db";
import { sortByPropertyLength } from "../helpers";

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

export const getAllUsers = async (sortBy: string = "uid-asc") => {
  const [field, order] = sortBy.split("-") as [string, "asc" | "desc"];

  // Ensure valid sorting inputs
  const validFields = [
    "uid",
    "firstname",
    "role",
    "isVerified",
    "problems_count",
  ]; // Add more valid fields as needed
  const validOrder = ["asc", "desc"];

  if (!validFields.includes(field) || !validOrder.includes(order)) {
    throw new Error("Invalid sorting parameters.");
  }

  try {
    if (field === "problems_count") {
      // Sort by the number of problems
      const users = await prisma.user.findMany({
        include: {
          problems: {
            select: {
              title: true,
            },
          },
        },
      });

      return sortByPropertyLength(users, "problems", order);
    } else {
      // Sort by regular fields (e.g., cat_name)
      const users = await prisma.user.findMany({
        orderBy: {
          [field]: order, // Dynamically set sorting field and order
        },
        include: {
          problems: {
            select: {
              title: true,
            },
          },
        },
      });

      return users;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Greška prilikom preuzimanja korisnika.`);
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
        role: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return user;
  } catch (error: unknown) {
    console.log(error);
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

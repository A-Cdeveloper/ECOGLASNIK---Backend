import { ProblemStatus, UserRole } from "@prisma/client";
import { MAX_PAGE_SIZE } from "@/app/config";
import prisma from "../db/db";
import { sortByPropertyLength } from "../helpers";
import { t } from "../messages";
export const getSuperAdmin = async (adminId: number) => {
  try {
    const superadmin = await prisma.user.findUnique({
      where: {
        uid: adminId,
        role: UserRole.SUPERADMIN,
      },
    });
    return superadmin;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error();
    }
  }
};

export const getAllUsers = async (
  sortBy: string = "status-desc",
  role: string = "",
  startIndex?: number,
  pageSize?: number
) => {
  const [field, order] = sortBy.split("-") as [string, "asc" | "desc"];

  // Ensure valid sorting inputs
  const validFields = ["status", "firstname", "isVerified", "problems_count"]; // Add more valid fields as needed
  const validOrder = ["asc", "desc"];

  if (!validFields.includes(field) || !validOrder.includes(order)) {
    throw new Error(t("invalid_sort"));
  }

  const whereClause = role
    ? {
        role: role as UserRole,
      }
    : undefined;

  try {
    if (field === "problems_count") {
      const [users, totalUsers] = await Promise.all([
        prisma.user.findMany({
          where: whereClause,
          skip: startIndex || 0,
          take: pageSize || MAX_PAGE_SIZE,
          include: {
            problems: {
              where: {
                status: { not: ProblemStatus.ARCHIVE },
              },
              select: {
                title: true,
              },
            },
          },
        }),
        prisma.user.count({ where: whereClause }),
      ]);

      const usersFiltered = sortByPropertyLength(users, "problems", order);

      return { users: usersFiltered, totalUsers };
    } else {
      const [users, totalUsers] = await Promise.all([
        prisma.user.findMany({
          where: whereClause,
          skip: startIndex || 0,
          take: pageSize || MAX_PAGE_SIZE,
          orderBy: {
            [field]: order, // Dynamically set sorting field and order
          },
          include: {
            problems: {
              where: {
                status: { not: ProblemStatus.ARCHIVE },
              },
              select: {
                title: true,
              },
            },
          },
        }),
        prisma.user.count({ where: whereClause }),
      ]);

      return { users, totalUsers };
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(t("users.no_users_found"));
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
    if (error instanceof Error) {
      throw new Error(t("users.no_user_found"));
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
      throw new Error(t("users.user_delete_error"));
    }
  }
};

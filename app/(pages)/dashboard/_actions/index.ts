import prisma from "@/app/_utils/db/db";

export async function getCounts() {
  const [problemsCount, categoriesCount, usersCount, organisationsCount] =
    await Promise.all([
      prisma.problem.count(),
      prisma.problemCategory.count(),
      prisma.user.count(),
      prisma.organisation.count(),
    ]);

  return {
    problems: problemsCount,
    categories: categoriesCount,
    users: usersCount,
    organisations: organisationsCount,
  };
}

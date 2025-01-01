import { Prisma } from "@prisma/client";

export type ProblemCategoriesType = Prisma.ProblemCategoryGetPayload<{
  include: {
    organisations: {
      select: {
        oid: true;
        organisation_name: true;
      };
    };
    problems: {
      select: {
        title: true;
      };
    };
  };
}>;

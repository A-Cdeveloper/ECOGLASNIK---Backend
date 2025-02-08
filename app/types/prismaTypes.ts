import { Prisma, Settings, User } from "@prisma/client";

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
        status: true;
        officialEmail: true;
      };
    };
  };
}>;

export type OrganisationType = Prisma.OrganisationGetPayload<{
  include: {
    categories: true;
  };
}>;

export type SettingsWithoutId = Omit<Settings, "id">;

export type UserRestrictedType = Omit<
  User,
  "passwordHash" | "verificationToken"
>;

export type ProblemCustumType = Prisma.ProblemGetPayload<{
  select: {
    id: true;
    title: true;
    createdAt: true;
    updatedAt: true;
    status: true;
    image: true;
    officialEmail: true;
    category: {
      select: {
        cat_id: true;
        cat_name: true;
      };
    };
  };
}>;

export type ProblemCustumTypeWithUser = Prisma.ProblemGetPayload<{
  select: {
    id: true;
    title: true;
    description: true;
    createdAt: true;
    updatedAt: true;
    status: true;
    image: true;
    position: true;
    officialEmail: true;
    category: {
      select: {
        cat_id: true;
        cat_name: true;
      };
    };
    user: {
      select: {
        uid: true;
        firstname: true;
        lastname: true;
        email: true;
      };
    };
  };
}>;

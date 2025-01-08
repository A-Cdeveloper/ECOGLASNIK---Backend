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

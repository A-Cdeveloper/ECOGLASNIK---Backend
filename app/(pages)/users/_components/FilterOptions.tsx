import { UserRole } from "@prisma/client";

export const userStatusOptions = [
  { value: "", label: "Svi" },
  { value: UserRole.USER, label: "Korisnici" },
  { value: UserRole.SUPERADMIN, label: "Superadmini" },
];

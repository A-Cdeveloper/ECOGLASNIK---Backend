import { ProblemStatus } from "@prisma/client";

export const problemStatusOptions = [
  { value: "", label: "Svi" },
  { value: ProblemStatus.ACTIVE, label: "Aktivni" },
  { value: ProblemStatus.DONE, label: "Rešeni" },
  { value: ProblemStatus.WAITING, label: "U odradi" },
];

export const statuses = [
  { value: ProblemStatus.ACTIVE, label: "Aktivan" },
  { value: ProblemStatus.DONE, label: "Rešen" },
  { value: ProblemStatus.WAITING, label: "U odradi" },
  { value: ProblemStatus.ARCHIVE, label: "Arhiviran" },
];

export const intervalOptions = [
  { value: "", label: "7 dana" },
  { value: "14", label: "14 dana" },
  { value: "30", label: "30 dana" },
  { value: "60", label: "60 dana" },
];

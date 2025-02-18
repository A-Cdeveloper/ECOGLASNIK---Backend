import { ProblemOfficialEmail, ProblemStatus } from "@prisma/client";

export const problemStatusOptions = [
  { value: "", label: "Svi" },
  { value: ProblemStatus.ACTIVE, label: "Aktivni" },
  { value: ProblemStatus.DONE, label: "Rešeni" },
  { value: ProblemStatus.WAITING, label: "Odrada" },
];

export const problemOfficialOptions = [
  { value: "", label: "Svi" },
  { value: ProblemOfficialEmail.REQUESTED, label: "Zatražena" },
  { value: ProblemOfficialEmail.SENT, label: "Poslata" },
];

export const statuses = [
  { value: ProblemStatus.ACTIVE, label: "Aktivan" },
  { value: ProblemStatus.DONE, label: "Rešen" },
  { value: ProblemStatus.WAITING, label: "Odrada" },
  { value: ProblemStatus.ARCHIVE, label: "Arhiviran" },
];

export const intervalOptions = [
  { value: "", label: "7 dana" },
  { value: "14", label: "14 dana" },
  { value: "30", label: "30 dana" },
  { value: "60", label: "60 dana" },
];

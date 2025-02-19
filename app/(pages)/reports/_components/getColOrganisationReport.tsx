import DynamicIcon from "@/app/_components/ui/DynamicIcon";
import { formatDate } from "@/app/_utils/helpers/";
import { ProblemOfficialEmail, ProblemStatus } from "@prisma/client";
import Link from "next/link";
import {
  HiMiniCheckCircle,
  HiMiniEnvelope,
  HiMiniExclamationCircle,
  HiMiniQuestionMarkCircle,
} from "react-icons/hi2";

/* eslint-disable @typescript-eslint/no-explicit-any */

export const getColOrganisationReport = () => [
  {
    header: "Problem",
    accessor: (row: any) => {
      return (
        <Link key={row.id} href={`/problems/${row.id}`}>
          {row.title}
        </Link>
      );
    },
    className: "max-w-[200px]",
  },

  {
    header: "Datum prijave",
    accessor: (row: any) => {
      return (
        <>
          <span className="block">{formatDate(row.createdAt)}</span>
          {row.officialEmail !== ProblemOfficialEmail.NONE && (
            <span
              className={`flex gap-x-1 ${
                row.officialEmail === ProblemOfficialEmail.REQUESTED
                  ? "text-skyblue-200"
                  : "text-success-200"
              }`}
            >
              <DynamicIcon Icon={HiMiniEnvelope} />
              {row.officialEmail === ProblemOfficialEmail.REQUESTED
                ? "zahtev na čekanju"
                : "prijava poslata"}
            </span>
          )}
        </>
      );
    },
  },
  {
    header: "Datum rešavanja",
    accessor: (row: any) => formatDate(row.updatedAt),
  },
  {
    header: "Status",
    accessor: (row: any) => {
      switch (row.status) {
        case ProblemStatus.ACTIVE:
          return (
            <DynamicIcon
              Icon={HiMiniExclamationCircle}
              className="text-red-500 ms-3"
            />
          );
        case ProblemStatus.DONE:
          return (
            <DynamicIcon
              Icon={HiMiniCheckCircle}
              className="text-success-200 ms-3"
            />
          );

        case ProblemStatus.WAITING:
          return (
            <DynamicIcon
              Icon={HiMiniQuestionMarkCircle}
              className="text-skyblue-200 ms-3"
            />
          );
      }
      return <>{row.status}</>;
    },
  },
];

import Operations from "@/app/_components/dataOperations/IconOperationsButtons";
import DynamicIcon from "@/app/_components/ui/DynamicIcon";
import Picture from "@/app/_components/ui/Picture";
import { formatDate } from "@/app/_utils/helpers/";
import Link from "next/link";
import {
  HiMiniCheckCircle,
  HiMiniEnvelope,
  HiMiniExclamationCircle,
  HiMiniPauseCircle,
  HiMiniQuestionMarkCircle,
} from "react-icons/hi2";
import { cloneProblemByIdAction, deleteProblemByIdAction } from "../_actions";
import { ProblemOfficialEmail, ProblemStatus } from "@prisma/client";

/* eslint-disable @typescript-eslint/no-explicit-any */

export const getColumnsProblems = ({
  category = true,
  status = true,
  operations = true,
  image = true,
  archive = false,
}: {
  image?: boolean;
  category?: boolean;
  status?: boolean;
  operations?: boolean;
  archive?: boolean;
}) => [
  ...(image
    ? [
        {
          header: "",
          accessor: (row: any) => <Picture src={row.image} alt={row.title} />,
          className: "max-w-full lg:max-w-[120px]",
        },
      ]
    : []),

  {
    header: "Problem",
    accessor: (row: any) => {
      return <Link href={`/problems/${row.id}`}>{row.title}</Link>;
    },
    className: "max-w-[200px]",
  },
  ...(category
    ? [
        {
          header: "Kategorija",
          accessor: (row: any) => {
            if (!row.category) return null;
            return (
              <Link href={`/categories/${row.category.cat_id}`}>
                {row.category.cat_name}
              </Link>
            );
          },
          className: "max-w-[150px]",
        },
      ]
    : []),
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
  ...(!archive
    ? [
        {
          header: "Datum rešavanja",
          accessor: (row: any) => formatDate(row.updatedAt),
        },
      ]
    : []),

  ...(status
    ? [
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
              case ProblemStatus.ARCHIVE:
                return (
                  <DynamicIcon
                    Icon={HiMiniPauseCircle}
                    className="text-warrning-500 ms-3"
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
      ]
    : []),
  ...(operations
    ? [
        {
          header: "",
          accessor: (row: any) => (
            <Operations
              id={row.id as string}
              basePath="problems"
              cloneAction={cloneProblemByIdAction}
              deleteAction={deleteProblemByIdAction}
            />
          ),
        },
      ]
    : []),
];

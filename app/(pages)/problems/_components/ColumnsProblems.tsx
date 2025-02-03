import DynamicIcon from "@/app/_components/ui/DynamicIcon";
import Operations from "@/app/_components/dataOperations/IconOperationsButtons";
import Picture from "@/app/_components/ui/Picture";
import { formatDate } from "@/app/_utils/helpers";
import Link from "next/link";
import {
  HiMiniCheckCircle,
  HiMiniEnvelope,
  HiMiniExclamationCircle,
  HiPauseCircle,
} from "react-icons/hi2";
import { cloneProblemByIdAction, deleteProblemByIdAction } from "../_actions";

/* eslint-disable @typescript-eslint/no-explicit-any */

export const getColumnsProblems = ({
  category = true,
  status = true,
  operations = true,
  image = true,
}: {
  image?: boolean;
  category?: boolean;
  status?: boolean;
  operations?: boolean;
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
      if (row.officialEmail === "0") return "-";
      return (
        <>
          <span className="block">{formatDate(row.createdAt)}</span>
          <span className="flex gap-x-1">
            <DynamicIcon Icon={HiMiniEnvelope} className="text-secondary-500" />
            prijavljeno
          </span>
        </>
      );
    },
  },

  {
    header: "Datum rešavanja",
    accessor: (row: any) => formatDate(row.updatedAt),
  },
  ...(status
    ? [
        {
          header: "Status",
          accessor: (row: any) => {
            switch (row.status) {
              case "active":
                return (
                  <DynamicIcon
                    Icon={HiMiniExclamationCircle}
                    className="text-red-500 ms-3"
                  />
                );
              case "done":
                return (
                  <DynamicIcon
                    Icon={HiMiniCheckCircle}
                    className="text-green-500 ms-3"
                  />
                );
              case "archive":
                return (
                  <DynamicIcon
                    Icon={HiPauseCircle}
                    className="text-warrning-500 ms-3"
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

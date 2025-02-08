import DynamicIcon from "@/app/_components/ui/DynamicIcon";
import { formatDate } from "@/app/_utils/helpers/";
import Link from "next/link";
import {
  HiMiniCheckCircle,
  HiMiniExclamationCircle,
  HiMiniQuestionMarkCircle,
  HiPauseCircle,
} from "react-icons/hi2";

/* eslint-disable @typescript-eslint/no-explicit-any */

export const getColumnsProblems = ({
  category = true,
  status = true,
}: {
  category?: boolean;
  status?: boolean;
}) => [
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
          className: "max-w-[200px]",
        },
      ]
    : []),
  {
    header: "Datum",
    accessor: (row: any) => formatDate(row.createdAt),
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
                    className="text-success-200 ms-3"
                  />
                );
              case "archive":
                return (
                  <DynamicIcon
                    Icon={HiPauseCircle}
                    className="text-warrning-500 ms-3"
                  />
                );
              case "waiting":
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
];

import DynamicIcon from "@/app/_components/ui/DynamicIcon";
import Picture from "@/app/_components/ui/Picture";
import { formatDate } from "@/app/_utils/helpers";
import Link from "next/link";
import {
  HiMiniCheckCircle,
  HiMiniExclamationCircle,
  HiPauseCircle,
} from "react-icons/hi2";
import Operations from "./Operations";

/* eslint-disable @typescript-eslint/no-explicit-any */

export const columns = [
  {
    header: "",
    accessor: (row: any) => <Picture src={row.image} alt={row.title} />,
    className: "max-w-full lg:max-w-[120px]",
  },
  {
    header: "Problem",
    accessor: (row: any) => {
      return <Link href={`/problems/${row.id}`}>{row.title}</Link>;
    },
    className: "max-w-[200px]",
  },
  {
    header: "Kategorija",
    accessor: (row: any) => {
      return (
        <Link href={`/categories/${row.category.cat_id}`}>
          {row.category.cat_name}
        </Link>
      );
    },
    className: "max-w-[200px]",
  },

  {
    header: "Datum prijave",
    accessor: (row: any) => formatDate(row.createdAt),
  },
  {
    header: "Datum rešavanja",
    accessor: (row: any) => formatDate(row.updatedAt),
  },
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

  {
    header: "",
    accessor: (row: any) => <Operations row={row} />,
  },
];

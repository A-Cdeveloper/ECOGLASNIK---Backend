/* eslint-disable @typescript-eslint/no-explicit-any */

import { getPercentage } from "@/app/_utils/helpers";

export const getColTotalReport = () => [
  {
    header: "",
    accessor: () => {
      return "";
    },
    className: "w-[300px]",
  },

  {
    header: "Ukupno problema",
    accessor: (row: any) => {
      return row.total;
    },
    cellClassName: "text-warrning-500 font-bold",
    className: "text-start md:text-center",
  },
  {
    header: "Aktivno",
    accessor: (row: any) => {
      return `${row.ACTIVE} (${getPercentage(row.ACTIVE, row.total)}%)`;
    },
    cellClassName: "text-warrning-500 font-bold",
    className: "text-start md:text-end",
  },
  {
    header: "Rešeno",
    accessor: (row: any) => {
      return `${row.DONE} (${getPercentage(row.DONE, row.total)}%)`;
    },
    cellClassName: "text-warrning-500 font-bold",
    className: "text-start md:text-end",
  },
  {
    header: "Zvanično prijavljeno/rešeno",
    accessor: (row: any) =>
      `${row.SENT} / ${row.officialDone} (${getPercentage(
        row.officialDone,
        row.SENT
      )}%)`,
    cellClassName: "text-warrning-500",
    className: "text-start md:text-center opacity-50",
  },
];

/* eslint-disable @typescript-eslint/no-explicit-any */

import { getPercentage } from "@/app/_utils/helpers";

export const getColCategoriesReport = () => [
  {
    header: "Kategorija",
    accessor: (row: any) => {
      return row.name;
    },
    className: "w-[300px]",
  },

  {
    header: "Ukupno problema",
    accessor: (row: any) => {
      return row.problemsCounts.total;
    },
    className: "text-start md:text-center",
  },
  {
    header: "Aktivno",
    accessor: (row: any) => {
      return `${row.problemsCounts.ACTIVE} (${getPercentage(
        row.problemsCounts.ACTIVE,
        row.problemsCounts.total
      )}%)`;
    },
    className: "text-start md:text-end",
  },
  {
    header: "Rešeno",
    accessor: (row: any) => {
      return `${row.problemsCounts.DONE} (${getPercentage(
        row.problemsCounts.DONE,
        row.problemsCounts.total
      )}%)`;
    },
    className: "text-start md:text-end",
  },
  {
    header: "Zvanično prijavljeno/rešeno",
    accessor: (row: any) =>
      `${row.problemsCounts.SENT} / ${row.problemsCounts.officialDone}`,
    className: "text-start md:text-center opacity-50",
  },
];

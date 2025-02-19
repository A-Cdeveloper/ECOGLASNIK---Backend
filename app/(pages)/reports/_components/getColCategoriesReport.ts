/* eslint-disable @typescript-eslint/no-explicit-any */

export const getColCategoriesReport = () => [
  {
    header: "Kategorija",
    accessor: (row: any) => {
      return row.name;
    },
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
      return row.problemsCounts.ACTIVE;
    },
    className: "text-start md:text-center",
  },
  {
    header: "Rešeno",
    accessor: (row: any) => {
      return row.problemsCounts.DONE;
    },
    className: "text-start md:text-center",
  },
  {
    header: "Zvanično prijavljeno/rešeno",
    accessor: (row: any) =>
      `${row.problemsCounts.SENT} / ${row.problemsCounts.officialDone}`,
    className: "text-start md:text-center opacity-50",
  },
];

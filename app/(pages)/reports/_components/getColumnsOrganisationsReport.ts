/* eslint-disable @typescript-eslint/no-explicit-any */

export const getColumnsOrganisationsReport = () => [
  {
    header: "Služba",
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
    header: "Zvanično prijavljeno",
    accessor: (row: any) => {
      return row.problemsCounts.SENT;
    },
    className: "text-start md:text-center opacity-50",
  },
  {
    header: "",
    accessor: () => {
      return "info";
    },
    className: "text-start md:text-center opacity-50",
  },
];

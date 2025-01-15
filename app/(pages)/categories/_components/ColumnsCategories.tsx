import Link from "next/link";
import Operations from "./Operations";

/* eslint-disable @typescript-eslint/no-explicit-any */

export const getColumnsCategories = ({
  id = true,
  operations = true,
  organisations = true,
  problems = true,
}: {
  id?: boolean;
  operations?: boolean;
  organisations?: boolean;
  problems?: boolean;
}) => [
  ...(id
    ? [
        {
          header: "ID",
          accessor: (row: any) => row.cat_id,
        },
      ]
    : []),

  {
    header: id ? "Kategorija" : "Kategorije problema",
    accessor: (row: any) => {
      return <Link href={`/categories/${row.cat_id}`}>{row.cat_name}</Link>;
    },
  },
  ...(organisations
    ? [
        {
          header: "Nadležnost",
          accessor: (row: any) =>
            row.organisations.map((org: any) => (
              <p key={org.oid}>
                <Link href={`/organisations/${org.oid}`}>
                  {org.organisation_name}
                </Link>
              </p>
            )),
        },
      ]
    : []),
  ...(problems
    ? [
        {
          header: "Prijave",
          accessor: (row: any) =>
            row.problems.filter((problem: any) => problem.status !== "archive")
              .length,
          className: "text-start md:text-center",
        },
        {
          header: "Aktivne",
          accessor: (row: any) =>
            row.problems.filter((problem: any) => problem.status === "active")
              .length,
          className: "text-start md:text-center",
        },
        {
          header: "Rešene",
          accessor: (row: any) =>
            row.problems.filter((problem: any) => problem.status === "done")
              .length,
          className: "text-start md:text-center",
        },
      ]
    : []),

  ...(operations
    ? [
        {
          header: "",
          accessor: (row: any) => <Operations row={row} />,
        },
      ]
    : []),
];

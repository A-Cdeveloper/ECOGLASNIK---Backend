import Link from "next/link";
import Operations from "./Operations";

/* eslint-disable @typescript-eslint/no-explicit-any */

export const columns = [
  {
    header: "ID",
    accessor: (row: any) => row.cat_id,
  },
  {
    header: "Kategorija",
    accessor: (row: any) => {
      return <Link href={`/categories/${row.cat_id}`}>{row.cat_name}</Link>;
    },
  },
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
  {
    header: "Prijave",
    accessor: (row: any) => row.problems.length,
    className: "text-start md:text-center",
  },
  {
    header: "",
    accessor: (row: any) => <Operations row={row} />,
  },
];

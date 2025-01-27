import { formatDateWithTime } from "@/app/_utils/helpers";
import Link from "next/link";

/* eslint-disable @typescript-eslint/no-explicit-any */

export const getColumnsUsers = () => [
  {
    header: "Korisnik",
    accessor: (row: any) => {
      return (
        <>
          <Link
            href={`${
              row.role === "superadmin" ? "#" : `/users/${row.uid}/edit`
            }`}
          >
            {row.firstname} {row.lastname}
            <br />
            {row.email}
          </Link>
        </>
      );
    },
  },
  {
    header: "Role",
    accessor: (row: any) => row.role,
  },

  {
    header: "Pristup",
    accessor: (row: any) => formatDateWithTime(row.lastLogin),
  },
];
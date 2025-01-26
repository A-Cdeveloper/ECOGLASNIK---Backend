import { formatDateWithTime } from "@/app/_utils/helpers";

/* eslint-disable @typescript-eslint/no-explicit-any */

export const getColumnsUsers = () => [
  {
    header: "Korisnik",
    accessor: (row: any) => {
      return (
        <>
          <p>
            {row.firstname} {row.lastname}
            <br />
            {row.email}
          </p>
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

import { formatDate } from "@/app/_utils/helpers";

import { HiMiniCheckCircle, HiMiniMinusCircle } from "react-icons/hi2";
import DynamicIcon from "@/app/_components/ui/DynamicIcon";
import Operations from "@/app/_components/ui/Elements/OperationsIconButtons";

/* eslint-disable @typescript-eslint/no-explicit-any */

export const getColumnsUsers = ({
  operations = true,
}: {
  operations?: boolean;
}) => [
  {
    header: "ID",
    accessor: (row: any) => row.uid,
  },
  {
    header: "Korisnik",
    accessor: (row: any) => {
      return (
        <>
          <p>
            {row.firstname} {row.lastname}
          </p>
        </>
      );
    },
  },
  {
    header: "Kontakt podaci",
    accessor: (row: any) => {
      return (
        <>
          <p>{row.phone}</p>
          <p>{row.email}</p>
        </>
      );
    },
  },
  {
    header: "Verifikacija",
    accessor: (row: any) => {
      return (
        <div className="ms-0 md:ms-8">
          {row.isVerified ? (
            <DynamicIcon Icon={HiMiniCheckCircle} className="text-green-500" />
          ) : (
            <DynamicIcon Icon={HiMiniMinusCircle} className="text-red-500" />
          )}
        </div>
      );
    },
  },
  {
    header: "Role",
    accessor: (row: any) => row.role,
  },
  {
    header: "Kreiran",
    accessor: (row: any) => formatDate(row.createdAt),
  },
  // {
  //   header: "Status",
  //   accessor: (row: any) => "Online",
  // },
  {
    header: "Prijave",
    accessor: (row: any) => {
      return (
        <>
          <p className="ms-0 md:ms-4">{row.problems?.length}</p>
        </>
      );
    },
  },

  ...(operations
    ? [
        {
          header: "",
          accessor: (row: any) => (
            <Operations id={row.uid as number} basePath="users" />
          ),
        },
      ]
    : []),
];

import { formatDate } from "@/app/_utils/helpers";

import { HiMiniCheckCircle, HiMiniMinusCircle } from "react-icons/hi2";
import DynamicIcon from "@/app/_components/ui/DynamicIcon";
import Operations from "@/app/_components/dataOperations/IconOperationsButtons";
import { deleteUserAction } from "../_actions";
import { getUserFromToken } from "@/app/(auth)/_actions";

/* eslint-disable @typescript-eslint/no-explicit-any */

const superAdminUid = async () => {
  const userData = await getUserFromToken();
  if (!userData?.user) {
    return null;
  }
  return userData.user?.uid;
};

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
          accessor: async (row: any) => {
            if (
              row.uid === 1 ||
              row.uid === (await superAdminUid()) ||
              (row.role === "superadmin" && row.uid !== (await superAdminUid()))
            )
              return;

            return (
              <Operations
                id={row.uid as number}
                basePath="users"
                deleteAction={deleteUserAction}
              />
            );
          },
        },
      ]
    : []),
];

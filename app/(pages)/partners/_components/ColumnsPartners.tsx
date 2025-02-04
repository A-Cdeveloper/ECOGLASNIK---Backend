/* eslint-disable @typescript-eslint/no-explicit-any */
import Operations from "@/app/_components/dataOperations/IconOperationsButtons";
import Picture from "@/app/_components/ui/Picture";
import { deletePartnerByIdAction } from "../_actions";

export const getColumnsPartners = ({
  operations = true,
  id = true,
}: {
  operations?: boolean;
  category?: boolean;
  contactData?: boolean;
  id?: boolean;
}) => [
  ...(id
    ? [
        {
          header: "ID",
          accessor: (row: any) => row.pid,
        },
      ]
    : []),
  {
    header: "Naziv",
    accessor: (row: any) => row.partnerName,
  },
  {
    header: "Logo",
    accessor: (row: any) => (
      <Picture
        src={row.partnerLogo}
        alt={row.partnerName}
        className="!h-90px] !w-[160px]"
      />
    ),
    className: "max-w-full lg:max-w-[80px]",
  },

  ...(operations
    ? [
        {
          header: "",
          accessor: (row: any) => (
            <Operations
              id={row.pid as number}
              basePath="partners"
              deleteAction={deletePartnerByIdAction}
            />
          ),
        },
      ]
    : []),
];

import Link from "next/link";

import { deleteOrganisationByIdAction } from "../_actions";
import Operations from "@/app/_components/dataOperations/IconOperationsButtons";

/* eslint-disable @typescript-eslint/no-explicit-any */

export const getColumnsOrganisations = ({
  operations = true,
  category = true,
  contactData = true,
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
          accessor: (row: any) => row.oid,
        },
      ]
    : []),

  {
    header: category ? "Nadležna služba" : "Nadležne službe",
    accessor: (row: any) => {
      return (
        <Link href={`/organisations/${row.oid}`}>{row.organisation_name}</Link>
      );
    },
  },
  ...(contactData
    ? [
        {
          header: "Kontakt podaci",
          accessor: (row: any) => {
            return (
              <div>
                <p>{row.organisation_address}</p>
                <p>{row.organisation_email}</p>
                <p>{row.organisation_phone}</p>
              </div>
            );
          },
        },
      ]
    : []),

  ...(category
    ? [
        {
          header: "Kategorije problema",
          accessor: (row: any) =>
            row.categories.map((cat: any) => {
              return (
                <p key={cat.cat_id}>
                  <Link href={`/categories/${cat.cat_id}`}>{cat.cat_name}</Link>
                </p>
              );
            }),
        },
      ]
    : []),

  ...(operations
    ? [
        {
          header: "",
          accessor: (row: any) => (
            <Operations
              id={row.oid as number}
              basePath="organisations"
              deleteAction={deleteOrganisationByIdAction}
            />
          ),
        },
      ]
    : []),
];

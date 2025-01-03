import Operations from "./Operations";

/* eslint-disable @typescript-eslint/no-explicit-any */

export const columns = [
  {
    header: "ID",
    accessor: (row: any) => row.oid,
  },
  {
    header: "Nadležna služba",
    accessor: (row: any) => row.organisation_name,
  },
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
  {
    header: "Kategorije problema",
    accessor: (row: any) =>
      row.categories.map((cat: any) => <p key={cat.cat_id}>{cat.cat_name}</p>),
  },
  {
    header: "",
    accessor: (row: any) => <Operations row={row} />,
  },
];

// Column type definition
type Column<T> = {
  header: string;
  accessor: (row: T) => React.ReactNode;
  className?: string;
};

// TableProps definition
type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  rowKey: (row: T) => string | number;
};

// Table component
const Table = <T,>({ data, columns, rowKey }: TableProps<T>) => {
  return (
    <table className="table-auto border-collapse w-full 2xl:w-3/4 text-left mt-3 text-[13px]">
      <TableHeader columns={columns} />
      <tbody>
        {data.map((row, rowIndex) => (
          <tr
            key={rowKey(row)}
            className={`${
              rowIndex % 2 === 0 ? "" : "bg-secondary-100/10"
            }  md:table-row block border-b border-secondary-500/20 text-winter-100/60`}
          >
            <TableCell
              columns={columns}
              row={row as T extends { status?: unknown } ? T : never}
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// TableHeader component
const TableHeader = <T,>({ columns }: { columns: Column<T>[] }) => {
  return (
    <thead className="hidden md:table-header-group">
      <tr className="border-b border-t border-secondary-500/20 uppercase text-[14px]">
        {columns.map((col, index) => (
          <th
            key={index}
            className={`px-2 lg:px-4 py-1 ${col.className || ""}`}
          >
            {col.header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

// TableCell component
const TableCell = <T extends { status?: unknown }>({
  columns,
  row,
}: {
  columns: Column<T>[];
  row: T;
}) => {
  const status = typeof row.status === "number" ? row.status : null;

  return (
    <>
      {columns.map((col, colIndex) => (
        <td
          key={colIndex}
          className={`px-2 lg:px-4 py-1 lg:py-[8px] block md:table-cell ${
            col.className || ""
          } ${status === 1 ? "text-success-100" : ""}`}
          data-header={col.header} // Data attribute for accessibility
        >
          {/* Show the header caption only on small screens */}
          <span className="md:hidden font-semibold block uppercase">
            {col.header}
          </span>
          {col.accessor(row)}
        </td>
      ))}
    </>
  );
};

export default Table;

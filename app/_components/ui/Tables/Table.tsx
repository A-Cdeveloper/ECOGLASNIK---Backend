import React from "react";

// Column type definition
type Column<T> = {
  header: string;
  accessor: (row: T) => React.ReactNode;
  className?: string;
  isMiniTable?: boolean;
};

// TableProps definition
type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  rowKey: (row: T) => string | number;
  isMiniTable?: boolean;
};

// Table component
const Table = <T,>({
  data,
  columns,
  rowKey,
  isMiniTable = false,
}: TableProps<T>) => {
  const tableClasses = isMiniTable
    ? "table-auto border-collapse w-full text-left text-[12px]"
    : "table-auto border-collapse w-full 2xl:w-3/4 text-left mt-3 text-[13px]";

  const wrapperClasses = isMiniTable
    ? "overflow-x-auto max-h-[250px] scrollbar-thin scrollbar-thumb-secondary-900/30 scrollbar-track-secondary-100/10"
    : "";

  // Use a dynamic component renderer
  const HeaderComponent = isMiniTable
    ? (MiniTableHeader as (props: { columns: Column<T>[] }) => JSX.Element)
    : (TableHeader as (props: { columns: Column<T>[] }) => JSX.Element);

  return (
    <>
      <div className={wrapperClasses}>
        <table className={tableClasses}>
          {React.createElement(HeaderComponent, { columns })}
          <tbody className={isMiniTable ? "overflow-y-scroll" : ""}>
            {data.map((row, rowIndex) => (
              <tr
                key={rowKey(row)}
                className={`${
                  isMiniTable
                    ? "text-winter-100/60 border-b border-secondary-500/20"
                    : rowIndex % 2 === 0
                    ? ""
                    : "bg-secondary-100/10"
                } md:table-row block border-b border-secondary-500/20 text-winter-100/60`}
              >
                <TableCell
                  columns={columns}
                  row={row as T extends { status?: unknown } ? T : never}
                  isMiniTable={isMiniTable}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
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

const MiniTableHeader = <T,>({ columns }: { columns: Column<T>[] }) => {
  return (
    <thead className="sticky top-0 z-10 bg-primary-100/50 hidden md:table-header-group">
      <tr className="border-b border-secondary-500/20 uppercase text-[12px]">
        {columns.map((col, index) => (
          <th
            key={index}
            className={`px-2 lg:px-4 py-2 ${col.className || ""}`}
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
  isMiniTable = false,
}: {
  columns: Column<T>[];
  row: T;
  isMiniTable?: boolean;
}) => {
  const status = typeof row.status === "number" ? row.status : null;

  return (
    <>
      {columns.map((col, colIndex) => (
        <td
          key={colIndex}
          className={`px-2 lg:px-4 py-1 lg:py-[8px] block md:table-cell print:text-black ${
            col.className || ""
          } ${status === 1 && !isMiniTable ? "text-success-100" : ""}`}
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

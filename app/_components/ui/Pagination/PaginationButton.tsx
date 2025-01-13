import clsx from "clsx";
import React from "react";

const PaginationButton = ({
  type,
  currentPage,
  page,
  handlePageChange,
  totalPages,
}: {
  key?: number;
  type?: "prev" | "next";
  currentPage: number;
  page: number;
  handlePageChange: (page: number) => void;
  totalPages: number;
}) => {
  const pageButtonClass =
    "text-winter-100/70 border border-secondary-500/30 font-normal px-[8px] py-[3px] scale-100 hover:border-secondary-500/80 hover:bg-secondary-500/90 hover:text-primary-900";
  const activePageButtonClass = clsx(
    pageButtonClass,
    "border-secondary-500/80 font-semibold bg-secondary-500/90 text-primary-900"
  );

  if (type !== "prev" && type !== "next")
    return (
      <button
        className={clsx(
          currentPage === page ? activePageButtonClass : pageButtonClass
        )}
        onClick={() => handlePageChange(page)}
      >
        {page}
      </button>
    );

  return (
    <button
      className={pageButtonClass}
      disabled={type === "prev" ? currentPage <= 1 : currentPage >= totalPages}
      onClick={() =>
        handlePageChange(type === "prev" ? currentPage - 1 : currentPage + 1)
      }
    >
      {type === "prev" ? "Predhodna" : "Sledeća"}
    </button>
  );
};

export default PaginationButton;

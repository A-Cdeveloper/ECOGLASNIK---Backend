import clsx from "clsx";
import React from "react";

const PaginationButton = ({
  nonumber,
  currentPage,
  children,
  handlePageChange,
  goto,
  disabled,
}: {
  key?: number;
  nonumber?: boolean;
  children: React.ReactNode;
  currentPage: number;
  goto: number;
  handlePageChange: (page: number) => void;
  disabled?: boolean;
}) => {
  const pageButtonClass =
    "text-winter-100/70 border border-secondary-500/30 font-normal px-[8px] py-[1px] scale-100 hover:border-secondary-500/80 hover:bg-secondary-500/90 hover:text-primary-900";
  const activePageButtonClass =
    "border-secondary-500/80  bg-secondary-500/90 !text-primary-900";

  if (nonumber)
    return (
      <button
        className={pageButtonClass}
        onClick={() => handlePageChange(goto)}
        disabled={disabled}
      >
        {children}
      </button>
    );

  return (
    <button
      className={clsx(
        pageButtonClass, // Ensure base styles and hover are always included
        currentPage === goto && activePageButtonClass // Add active styles conditionally
      )}
      onClick={() => handlePageChange(goto)}
    >
      {children}
    </button>
  );
};

export default PaginationButton;

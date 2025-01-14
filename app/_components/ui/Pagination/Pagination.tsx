"use client";

import { useRouter, useSearchParams } from "next/navigation";
import PaginationButton from "./PaginationButton";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  queryKey?: string; // Defaults to "page"
};

const Pagination = ({
  totalPages,
  currentPage,
  queryKey = "page",
}: PaginationProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handlePageChange = (page: number) => {
    const currentParams = new URLSearchParams(searchParams?.toString() || "");

    if (page > 0 && page <= totalPages) {
      currentParams.set(queryKey, page.toString());
    } else {
      currentParams.delete(queryKey); // Remove the query parameter if the page is out of range
    }

    router.push(`?${currentParams.toString()}`); // Update the URL with the new page
  };

  return (
    <div className="flex gap-x-2 justify-end items-center mt-4 w-full 2xl:w-3/4 self-center">
      {/* First Page Button */}
      <PaginationButton
        nonumber={true}
        currentPage={currentPage}
        goto={1}
        handlePageChange={handlePageChange}
        disabled={currentPage - 1 <= 0}
      >
        «
      </PaginationButton>

      {/* Previous Page Button */}
      <PaginationButton
        nonumber={true}
        currentPage={currentPage}
        goto={currentPage - 1}
        disabled={currentPage - 1 <= 0}
        handlePageChange={handlePageChange}
      >
        ‹
      </PaginationButton>

      {/* Page Numbers */}
      <div className="md:flex hidden">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <PaginationButton
            key={page}
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            goto={page}
          >
            {page}
          </PaginationButton>
        ))}
      </div>

      {/* Compact Current Page Display for Smaller Screens */}
      <div className="flex md:hidden items-center">
        <span>{currentPage}</span>
        <span className="px-[4px] text-gray-500">/</span>
        <span>{totalPages}</span>
      </div>

      {/* Next Page Button */}
      <PaginationButton
        nonumber={true}
        currentPage={currentPage}
        goto={currentPage + 1}
        handlePageChange={handlePageChange}
        disabled={currentPage + 1 > totalPages}
      >
        ›
      </PaginationButton>

      {/* Last Page Button */}
      <PaginationButton
        nonumber={true}
        currentPage={currentPage}
        goto={totalPages}
        handlePageChange={handlePageChange}
        disabled={currentPage + 1 > totalPages}
      >
        »
      </PaginationButton>
    </div>
  );
};

export default Pagination;

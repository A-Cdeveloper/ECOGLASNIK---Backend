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
    <div className="flex gap-x-2 items-center  mt-4 w-full lg:w-3/4 self-center">
      {/* Previous Button */}
      <PaginationButton
        type="prev"
        page={currentPage - 1}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        totalPages={totalPages}
      />

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <PaginationButton
          key={page}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          totalPages={totalPages}
          page={page}
        />
      ))}

      {/* Next Button */}
      <PaginationButton
        type="next"
        page={currentPage + 1}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Pagination;

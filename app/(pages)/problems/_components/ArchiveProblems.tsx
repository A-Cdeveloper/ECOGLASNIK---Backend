import Table from "@/app/_components/ui/Tables/Table";

import Headline from "@/app/_components/ui/Headline";
import NoResurcesFound from "@/app/_components/ui/NoResurcesFound";
import Pagination from "@/app/_components/ui/Pagination/Pagination";
import SortSelector from "@/app/_components/ui/Sorting/SortSelector";
import TopBar from "@/app/_components/ui/TopBar";
import { MAX_PAGE_SIZE } from "@/app/_utils/contants";
import { getColumnsProblems } from "./ColumnsProblems";
import { sortOptions } from "./SortOptions";

import FilterSelector from "@/app/_components/ui/Filters/FilterSelector";
import {
  SkeletonPagination,
  SkeletonTable,
} from "@/app/_components/ui/Skeletons";
import { getAllCategories } from "@/app/_utils/api_utils/categories";
import { getAllProblems } from "@/app/_utils/api_utils/problems";
import { ProblemCustumType } from "@/app/types/prismaTypes";
import Link from "next/link";

const ArchiveProblems = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const {
    sortBy = "createdAt-desc",
    status = "archive",
    category,
    days,
    page = "1",
  } = await searchParams;

  const currentPage = parseInt(page, 10) || 1;

  // Fetch problems with pagination
  const { problems, totalProblems } = (await getAllProblems(
    sortBy,
    status,
    category,
    Number(days) || undefined,
    (currentPage - 1) * MAX_PAGE_SIZE,
    MAX_PAGE_SIZE
  )) as {
    problems: ProblemCustumType[];
    totalProblems: number;
  };

  const totalPages = Math.ceil(totalProblems / MAX_PAGE_SIZE);

  const { categories: categoriesApi } = (await getAllCategories()) as {
    categories: { cat_id: number; cat_name: string }[];
  };

  const categoriesSelection = categoriesApi?.map((cat) => {
    return {
      id: cat.cat_id.toString(),
      label: cat.cat_name,
    };
  });

  if (totalProblems === 0) {
    return (
      <>
        <NoResurcesFound className="h-1/3 2xl:w-3/4">
          <Headline level={3}>Nema arhiviranih problema.</Headline>
          <Link
            href="/problems"
            className="button info small mt-5 inline-block"
          >
            Svi problemi.
          </Link>
        </NoResurcesFound>
      </>
    );
  }

  return (
    <>
      <TopBar count={totalProblems}>
        <FilterSelector
          filterList={categoriesSelection || []}
          queryKey="category"
        />
        <SortSelector options={sortOptions} defaultSort="id-asc" />
      </TopBar>
      <div className="overflow-x-auto">
        <Table
          data={problems}
          columns={getColumnsProblems({ operations: false, archive: true })}
          rowKey={(row) => row.id}
        />
      </div>
      {totalPages > 1 && (
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      )}
    </>
  );
};

export default ArchiveProblems;

export const ArchiveProblemsSkeleton = () => (
  <>
    <SkeletonTable />
    <SkeletonPagination />
  </>
);

import Table from "@/app/_components/ui/Tables/Table";

import Headline from "@/app/_components/ui/Headline";
import NoResurcesFound from "@/app/_components/ui/NoResurcesFound";
import Pagination from "@/app/_components/ui/Pagination/Pagination";
import SortSelector from "@/app/_components/ui/Sorting/SortSelector";
import TopBar from "@/app/_components/ui/TopBar";
import { MAX_PAGE_SIZE } from "@/app/config";
import { getColumnsProblems } from "./ColumnsProblems";
import { sortOptions } from "./SortOptions";

import FilterButtons from "@/app/_components/ui/Filters/FilterButtons";
import FilterSelector from "@/app/_components/ui/Filters/FilterSelector";
import {
  SkeletonPagination,
  SkeletonTable,
  SkeletonTopBar,
} from "@/app/_components/ui/Skeletons";
import { getAllCategories } from "@/app/_utils/api_utils/categories";
import { getAllProblems } from "@/app/_utils/api_utils/problems";
import { ProblemCustumType } from "@/app/types/prismaTypes";
import Link from "next/link";
import { problemStatusOptions } from "./FilterOptions";
import { ProblemStatus } from "@prisma/client";

const AllProblems = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const {
    sortBy = "createdAt-desc",
    status,
    category,
    days,
    page = "1",
  } = await searchParams;

  const currentPage = parseInt(page, 10) || 1;

  // Fetch problems with pagination
  const { problems, totalProblems } = (await getAllProblems(
    sortBy,
    status as ProblemStatus,
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
          <Headline level={3}>
            Nema registrovanih prijava po ovom kriterijumu.
          </Headline>
          <Link
            href="/problems"
            className="button info small mt-5 inline-block"
          >
            Resetuj filtere
          </Link>
        </NoResurcesFound>
      </>
    );
  }

  return (
    <>
      <TopBar count={totalProblems}>
        <Link
          href="/problems/archive"
          className="text-[11px] border-1 border-primary-100 text-winter-100/60 py-1 px-2 hover:bg-primary-100 hover:text-winter-100"
        >
          Arhivirani problemi
        </Link>
        <FilterButtons filterList={problemStatusOptions} queryKey="status" />
        <FilterSelector
          filterList={categoriesSelection || []}
          queryKey="category"
        />
        <SortSelector options={sortOptions} defaultSort="id-asc" />
      </TopBar>
      <div className="overflow-x-auto">
        <Table
          data={problems}
          columns={getColumnsProblems({})}
          rowKey={(row) => row.id}
        />
      </div>
      {totalPages > 1 && (
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      )}
    </>
  );
};

export default AllProblems;

export const AllProblemsSkeleton = () => (
  <>
    <SkeletonTopBar />
    <SkeletonTable />
    <SkeletonPagination />
  </>
);

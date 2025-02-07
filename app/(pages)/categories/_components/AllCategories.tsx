import Table from "@/app/_components/ui/Tables/Table";

import Headline from "@/app/_components/ui/Headline";
import NoResurcesFound from "@/app/_components/ui/NoResurcesFound";
import Pagination from "@/app/_components/ui/Pagination/Pagination";
import SortSelector from "@/app/_components/ui/Sorting/SortSelector";
import TopBar, { AddNew } from "@/app/_components/ui/TopBar";
import { MAX_PAGE_SIZE } from "@/app/_utils/contants";
import Link from "next/link";
import { getColumnsCategories } from "./ColumnsCategories";
import { sortOptions } from "./SortOptions";

import { getAllCategories } from "@/app/_utils/api_utils/categories";
import { ProblemCategoriesType } from "@/app/types/prismaTypes";
import {
  SkeletonPagination,
  SkeletonTable,
  SkeletonTopBar,
} from "@/app/_components/ui/Skeletons";

const AllCategories = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { sortBy, page = "1" } = await searchParams;
  const currentPage = parseInt(page, 10) || 1;
  const { categories, totalCategories } = (await getAllCategories(
    sortBy,
    (currentPage - 1) * MAX_PAGE_SIZE,
    MAX_PAGE_SIZE
  )) as {
    categories: ProblemCategoriesType[];
    totalCategories: number;
  };

  const totalPages = Math.ceil(totalCategories / MAX_PAGE_SIZE);

  if (totalCategories === 0) {
    return (
      <>
        <NoResurcesFound>
          <>
            <Headline level={3}> Nema registrovanih kategorija.</Headline>
            <Link
              href="/categories/new"
              className="button info small mt-5 inline-block"
            >
              Dodaj novu kategoriju
            </Link>
          </>
        </NoResurcesFound>
      </>
    );
  }

  return (
    <>
      <TopBar count={totalCategories}>
        <SortSelector options={sortOptions} defaultSort="cat_id-asc" />

        <AddNew linkToNew="/categories/new">Nova kategorija</AddNew>
      </TopBar>
      <div className="overflow-x-auto">
        <Table
          data={categories}
          columns={getColumnsCategories({})}
          rowKey={(row) => row.cat_id}
        />
      </div>
      {totalPages > 1 && (
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      )}
    </>
  );
};

export default AllCategories;

export const AllCategoriesSkeleton = () => (
  <>
    <SkeletonTopBar />
    <SkeletonTable />
    <SkeletonPagination />
  </>
);

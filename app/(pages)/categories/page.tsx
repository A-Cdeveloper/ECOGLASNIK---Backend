import Loader from "@/app/_components/ui/Loader";

import SortSelector from "@/app/_components/ui/Sorting/SortSelector";
import TopBar, { AddNew } from "@/app/_components/ui/TopBar";
import { getAllCategories } from "@/app/_utils/api_utils/categories";
import { ProblemCategoriesType } from "@/app/_utils/db/prismaTypes";
import Link from "next/link";
import { Suspense } from "react";
import Headline from "../../_components/ui/Headline";
import AllCategories from "./_components/AllCategories";
import { sortOptions } from "./_components/SortOptions";
import NoResurcesFound from "@/app/_components/ui/NoResurcesFound";
import { MAX_PAGE_SIZE } from "@/app/_utils/contants";
import Pagination from "@/app/_components/ui/Pagination/Pagination";

const CategoriesPage = async ({
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

  console.log(categories);

  const totalPages = Math.ceil(totalCategories / MAX_PAGE_SIZE);
  //const categories = [] as ProblemCategoriesType[];

  let content = (
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

  if (totalPages !== 0) {
    content = (
      <>
        <Headline level={1}>Kategorije problema</Headline>
        <Suspense fallback={<Loader />}>
          <TopBar count={totalCategories}>
            <SortSelector options={sortOptions} defaultSort="cat_id-asc" />

            <AddNew linkToNew="/categories/new">Nova kategorija</AddNew>
          </TopBar>
          {totalPages > 1 && (
            <Pagination totalPages={totalPages} currentPage={currentPage} />
          )}
          <AllCategories categories={categories} />
        </Suspense>
      </>
    );
  }

  return <>{content}</>;
};

export default CategoriesPage;

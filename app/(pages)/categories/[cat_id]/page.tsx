/* eslint-disable @typescript-eslint/no-explicit-any */
import ItemOperationsButtons from "@/app/_components/dataOperations/ItemOperationsButtons";
import BackButton from "@/app/_components/ui/Buttons/BackButton";
import Headline from "@/app/_components/ui/Headline";
import Table from "@/app/_components/ui/Tables/Table";
import { getCategoryById } from "@/app/_utils/api_utils/categories";
import { Problem } from "@prisma/client";
import { Suspense } from "react";
import Stats from "../../../_components/dataOperations/problemsStats/Stats";
import ChartProblemsByCategory, {
  ChartProblemsByCategorySkeleton,
} from "../../dashboard/_components/appCharts/ChartProblemsByCategory";
import { getColumnsOrganisations } from "../../organisations/_components/ColumnsOrganisations";
import { getColumnsProblems } from "../../problems/_components/ColumnsProblems";
import { deleteCategoryByIdAction } from "../_actions";
import Pagination from "@/app/_components/ui/Pagination/Pagination";
import { MAX_PAGE_SIZE } from "@/app/config";

const CategoryPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ cat_id: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { page = "1" } = await searchParams;
  const { cat_id } = await params;
  const currentPage = parseInt(page, 10) || 1;

  const category = await getCategoryById(
    +cat_id,
    (currentPage - 1) * MAX_PAGE_SIZE,
    MAX_PAGE_SIZE
  );

  const totalPages =
    category?.allProblems.length &&
    Math.ceil(category?.allProblems.length / MAX_PAGE_SIZE);

  return (
    <>
      <BackButton to="/categories" />

      <Headline level={1}>{category?.cat_name}</Headline>

      <Stats
        items={category?.allProblems as Problem[]}
        statFilter={category?.cat_id}
        statParam="problems"
      />

      {category && (
        <div className="w-full 2xl:w-[47%] min-h-[300px] flex flex-col">
          <Suspense fallback={<ChartProblemsByCategorySkeleton />}>
            <ChartProblemsByCategory catId={cat_id} />
          </Suspense>
        </div>
      )}

      <div className="my-8">
        <Table
          data={category?.problems || []}
          columns={getColumnsProblems({
            image: false,
            category: false,
            operations: false,
          })}
          rowKey={(row) => row.id}
        />
        {totalPages && totalPages > 1 && (
          <Pagination totalPages={totalPages} currentPage={currentPage} />
        )}
      </div>

      <div className="my-8">
        <Table
          data={category?.organisations || []}
          columns={getColumnsOrganisations({
            id: false,
            category: false,
            operations: false,
            contactData: false,
          })}
          rowKey={(row) => row.oid}
        />
      </div>
      <div className="my-8 w-full 2xl:w-3/4">
        <ItemOperationsButtons
          id={category?.cat_id as number}
          basePath="categories"
          deleteAction={
            category?.problems?.length === 0
              ? deleteCategoryByIdAction
              : undefined
          }
        />{" "}
      </div>
    </>
  );
};

export default CategoryPage;

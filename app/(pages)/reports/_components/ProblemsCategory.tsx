import { getSingleCategoryProblemsReport } from "../_actions";

import FilterCategories from "@/app/_components/ui/Filters/FilterCategories";
import { SkeletonTable } from "@/app/_components/ui/Skeletons";
import Table from "@/app/_components/ui/Tables/Table";
import { Suspense } from "react";
import Calendars from "./Calendars";
import { getColOrganisationReport } from "./getColOrganisationReport";
import PrintButton from "./PrintButton";

const ProblemsCategory = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { startDate, endDate, category } = await searchParams;

  let content;

  if (startDate && endDate) {
    content = (
      <div className="space-y-9">
        <Suspense fallback={<SkeletonTable />}>
          <ProblemsSingleCategoryFetch
            startDate={startDate}
            endDate={endDate}
            categoryId={category as string}
          />
        </Suspense>
      </div>
    );
  }

  return (
    <>
      <div className="my-4 flex gap-2 items-center">
        <FilterCategories />
        <Calendars />
        {startDate && endDate && <PrintButton />}
      </div>
      <div className="my-4">{content}</div>
    </>
  );
};

export default ProblemsCategory;

/////////////////////////////////////////////////////
const ProblemsSingleCategoryFetch = async ({
  startDate,
  endDate,
  categoryId,
}: {
  startDate: string;
  endDate: string;
  categoryId: string;
}) => {
  const catProblems = await getSingleCategoryProblemsReport(
    new Date(startDate as string),
    new Date(endDate as string),
    categoryId
  );

  return (
    <Table
      data={catProblems?.categoryProblems || []}
      columns={getColOrganisationReport()}
      rowKey={(row) => row.id}
    />
  );
};

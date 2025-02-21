import { getAllCategoriesProblemsReport } from "../_actions";

import { SkeletonTable } from "@/app/_components/ui/Skeletons";
import Table from "@/app/_components/ui/Tables/Table";
import { Suspense } from "react";
import Calendars from "./Calendars";
import { getColCategoriesReport } from "./getColCategoriesReport";
import PrintButton from "./PrintButton";
import { getColTotalReport } from "./getColTotalReport";

const ProblemsCategories = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { startDate, endDate } = await searchParams;

  let content;

  if (startDate && endDate) {
    content = (
      <Suspense fallback={<SkeletonTable />}>
        <ProblemsCategoriesFetch startDate={startDate} endDate={endDate} />
      </Suspense>
    );
  }

  return (
    <>
      <div className="my-4 flex gap-2 items-center">
        <Calendars />
        {startDate && endDate && <PrintButton />}
      </div>
      <div className="my-4">{content}</div>
    </>
  );
};

export default ProblemsCategories;

/////////////////////////////////////////////////////
const ProblemsCategoriesFetch = async ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  const categories = await getAllCategoriesProblemsReport(
    new Date(startDate as string),
    new Date(endDate as string)
  );

  return (
    <>
      <Table
        data={categories?.categoriesWithProblemCounts || []}
        columns={getColCategoriesReport()}
        rowKey={(row) => row.name}
      />
      <Table
        data={[categories?.totalproblems] || []}
        columns={getColTotalReport()}
        rowKey={() => Math.random()}
      />
    </>
  );
};

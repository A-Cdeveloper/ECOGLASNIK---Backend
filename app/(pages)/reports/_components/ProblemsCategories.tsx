import { getAllCategoriesProblemsReport } from "../_actions";

import CalendarDatePicker from "@/app/_components/ui/DatePicker/CalendarDatePicker";
import Table from "@/app/_components/ui/Tables/Table";
import { getColCategoriesReport } from "./getColCategoriesReport";

const ProblemsCategories = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { startDate, endDate } = await searchParams;

  let content;

  if (startDate && endDate) {
    const categories = await getAllCategoriesProblemsReport(
      new Date(startDate as string),
      new Date(endDate as string)
    );
    content = (
      <Table
        data={categories?.categoriesWithProblemCounts || []}
        columns={getColCategoriesReport()}
        rowKey={(row) => row.name}
      />
    );
  }

  return (
    <>
      <div className="my-4 flex gap-2 items-center">
        <span>
          <CalendarDatePicker dateKey="startDate" />
        </span>
        do:
        <span>
          <CalendarDatePicker dateKey="endDate" />
        </span>
      </div>
      <div className="my-4">{content}</div>
    </>
  );
};

export default ProblemsCategories;

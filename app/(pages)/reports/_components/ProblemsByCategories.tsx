import { getAllCategoriesProblemsReport } from "../_actions";

import CalendarDatePicker from "@/app/_components/ui/DatePicker/CalendarDatePicker";
import Table from "@/app/_components/ui/Tables/Table";
import { getColumnsCategoriesReport } from "./getColumnsCategoriesReport";

const ProblemsByCategories = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { startDateCat, endDateCat } = await searchParams;

  let content;

  if (startDateCat && endDateCat) {
    const categories = await getAllCategoriesProblemsReport(
      new Date(startDateCat as string),
      new Date(endDateCat as string)
    );
    content = (
      <Table
        data={categories?.categoriesWithProblemCounts || []}
        columns={getColumnsCategoriesReport()}
        rowKey={(row) => row.name}
      />
    );
  }

  return (
    <>
      <div className="my-4 flex gap-2 items-center">
        Prijavljeni komunalni problemi po kategorijama za period od:{" "}
        <span>
          <CalendarDatePicker dateKey="startDateCat" />
        </span>
        do:
        <span>
          <CalendarDatePicker dateKey="endDateCat" />
        </span>
      </div>
      <div className="my-4">{content}</div>
    </>
  );
};

export default ProblemsByCategories;

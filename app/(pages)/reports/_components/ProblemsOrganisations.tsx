import { getAllOrganisationsProblemsReport } from "../_actions";

import { getColOrganisationsReport } from "./getColOrganisationsReport";
import Table from "@/app/_components/ui/Tables/Table";
import CalendarDatePicker from "@/app/_components/ui/DatePicker/CalendarDatePicker";
import { Suspense } from "react";
import { SkeletonTable } from "@/app/_components/ui/Skeletons";

const ProblemsOrganisations = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { startDate, endDate } = await searchParams;

  let content;

  if (startDate && endDate) {
    content = (
      <Suspense fallback={<SkeletonTable />}>
        <ProblemsOrganisationsFetch startDate={startDate} endDate={endDate} />
      </Suspense>
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

export default ProblemsOrganisations;

/////////////////////////////////////////////////////
const ProblemsOrganisationsFetch = async ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  const organisations = await getAllOrganisationsProblemsReport(
    new Date(startDate as string),
    new Date(endDate as string)
  );

  return (
    <Table
      data={organisations?.organisationsWithProblemCounts || []}
      columns={getColOrganisationsReport()}
      rowKey={(row) => row.name}
    />
  );
};

import { getAllOrganisationsProblemsReport } from "../_actions";

import { SkeletonTable } from "@/app/_components/ui/Skeletons";
import Table from "@/app/_components/ui/Tables/Table";
import { Suspense } from "react";
import Calendars from "./Calendars";
import { getColOrganisationsReport } from "./getColOrganisationsReport";
import PrintButton from "./PrintButton";
import { getColTotalReport } from "./getColTotalReport";

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
      <div className="my-4 flex flex-wrap gap-2 items-center">
        <Calendars />
        {startDate && endDate && <PrintButton />}
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
    <>
      <Table
        data={organisations?.organisationsWithProblemCounts || []}
        columns={getColOrganisationsReport()}
        rowKey={(row) => row.name}
      />
      <Table
        data={[organisations?.totalproblems] || []}
        columns={getColTotalReport()}
        rowKey={() => Math.random()}
      />
    </>
  );
};

import { getAllOrganisationsProblemsReport } from "../_actions";

import { getColumnsOrganisationsReport } from "./getColumnsOrganisationsReport";
import Table from "@/app/_components/ui/Tables/Table";
import CalendarDatePicker from "@/app/_components/ui/DatePicker/CalendarDatePicker";

const ProblemsByOrganisations = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { startDateOrg, endDateOrg } = await searchParams;

  let content;

  if (startDateOrg && endDateOrg) {
    const organisations = await getAllOrganisationsProblemsReport(
      new Date(startDateOrg as string),
      new Date(endDateOrg as string)
    );
    content = (
      <Table
        data={organisations?.organisationsWithProblemCounts || []}
        columns={getColumnsOrganisationsReport()}
        rowKey={(row) => row.name}
      />
    );
  }

  return (
    <>
      <div className="my-4 flex gap-2 items-center">
        Prijavljeni komunalni problemi po službama za period od:{" "}
        <span>
          <CalendarDatePicker dateKey="startDateOrg" />
        </span>
        do:
        <span>
          <CalendarDatePicker dateKey="endDateOrg" />
        </span>
      </div>
      <div className="my-4">{content}</div>
    </>
  );
};

export default ProblemsByOrganisations;

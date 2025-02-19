import {
  getSingleOrganisationCategoriesReport,
  getSingleOrganisationProblemsReport,
} from "../_actions";

import CalendarDatePicker from "@/app/_components/ui/DatePicker/CalendarDatePicker";
import FilterOrganisations from "@/app/_components/ui/Filters/FilterOrganisations";
import Table from "@/app/_components/ui/Tables/Table";
import { getColOrganisationReport } from "./getColOrganisationReport";
import { getColCategoriesReport } from "./getColCategoriesReport";
import { Suspense } from "react";
import { SkeletonTable } from "@/app/_components/ui/Skeletons";

const ProblemsOrganisation = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { startDate, endDate, organisationId } = await searchParams;

  let content;

  if (startDate && endDate) {
    content = (
      <div className="space-y-9">
        <Suspense fallback={<SkeletonTable />}>
          <ProblemsSingleCategoriesFetch
            startDate={startDate}
            endDate={endDate}
            organisationId={organisationId as string}
          />
        </Suspense>

        <Suspense fallback={<SkeletonTable />}>
          <ProblemsSingleOrganisationFetch
            startDate={startDate}
            endDate={endDate}
            organisationId={organisationId as string}
          />
        </Suspense>
      </div>
    );
  }

  return (
    <>
      <div className="my-4 flex gap-2 items-center">
        <FilterOrganisations />
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

export default ProblemsOrganisation;

/////////////////////////////////////////////////////
const ProblemsSingleCategoriesFetch = async ({
  startDate,
  endDate,
  organisationId,
}: {
  startDate: string;
  endDate: string;
  organisationId: string;
}) => {
  const orgCategories = await getSingleOrganisationCategoriesReport(
    new Date(startDate as string),
    new Date(endDate as string),
    organisationId
  );

  return (
    <Table
      data={orgCategories?.categoriesWithProblemCounts || []}
      columns={getColCategoriesReport()}
      rowKey={(row) => row.name}
    />
  );
};

/////////////////////////////////////////////////////
const ProblemsSingleOrganisationFetch = async ({
  startDate,
  endDate,
  organisationId,
}: {
  startDate: string;
  endDate: string;
  organisationId: string;
}) => {
  const organisationProblems = await getSingleOrganisationProblemsReport(
    new Date(startDate as string),
    new Date(endDate as string),
    organisationId
  );

  return (
    <Table
      data={organisationProblems?.organisationProblems || []}
      columns={getColOrganisationReport()}
      rowKey={(row) => row.id}
    />
  );
};

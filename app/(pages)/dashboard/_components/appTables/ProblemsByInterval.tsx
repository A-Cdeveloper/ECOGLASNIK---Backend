import Table from "@/app/_components/ui/Tables/Table";
import { getAllProblems } from "@/app/_utils/api_utils/problems";

import { intervalOptions } from "@/app/(pages)/problems/_components/FilterOptions";
import NoResurcesFound from "@/app/_components/ui/NoResurcesFound";
import { ProblemCustumType } from "@/app/_utils/db/prismaTypes";
import TopSection from "./TopSection";
import { getColumnsProblems } from "./ColumnsProblems";
import {
  SkeletonTable,
  SkeletonTopSection,
} from "@/app/_components/ui/Skeletons";

const ProblemsByInterval = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { days } = (await searchParams) || {};

  const { problems } = (await getAllProblems(
    "createdAt-desc",
    "",
    "",
    days ? Number(days) : 7,
    0,
    1000
  )) as unknown as {
    problems: ProblemCustumType[];
  };

  let content = (
    <Table
      data={problems}
      columns={getColumnsProblems({})}
      rowKey={(row) => row.id}
      isMiniTable
    />
  );

  if (problems.length === 0) {
    content = (
      <NoResurcesFound>Nema prijava u poslednjih {days} dana.</NoResurcesFound>
    );
  }

  return (
    <>
      <TopSection
        itemsCount={problems.length}
        filteredItems={intervalOptions}
        queryKey="days"
      >
        Prijavljeni problemi
      </TopSection>

      {content}
    </>
  );
};

export default ProblemsByInterval;

export const ProblemsByIntervalSkeleton = () => (
  <>
    <SkeletonTopSection />
    <SkeletonTable cellNumber={4} />
  </>
);

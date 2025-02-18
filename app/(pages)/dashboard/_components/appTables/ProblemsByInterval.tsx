import Table from "@/app/_components/ui/Tables/Table";
import { getAllProblems } from "@/app/_utils/api_utils/problems";

import { intervalOptions } from "@/app/(pages)/problems/_components/FilterOptions";
import NoResurcesFound from "@/app/_components/ui/NoResurcesFound";
import { ProblemCustumType } from "@/app/types/prismaTypes";
import TopSection from "./TopSection";
import { getColumnsProblems } from "./ColumnsProblems";
import {
  SkeletonTable,
  SkeletonTopSection,
} from "@/app/_components/ui/Skeletons";
import { ProblemStatus } from "@prisma/client";

const ProblemsByInterval = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { days } = (await searchParams) || {};

  const { problems } = (await getAllProblems(
    "createdAt-desc",
    undefined,
    undefined,
    undefined,
    days ? Number(days) : 7,
    0,
    1000
  )) as unknown as {
    problems: ProblemCustumType[];
  };

  const notArchivedProblems = problems.filter((problem) => {
    return problem.status !== ProblemStatus.ARCHIVE;
  });

  let content = (
    <Table
      data={notArchivedProblems}
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
        itemsCount={notArchivedProblems.length}
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

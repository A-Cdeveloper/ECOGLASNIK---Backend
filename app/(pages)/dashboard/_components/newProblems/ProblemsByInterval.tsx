import Headline from "@/app/_components/ui/Headline";
import Table from "@/app/_components/ui/Tables/Table";
import { getAllProblems } from "@/app/_utils/api_utils/problems";

import { intervalOptions } from "@/app/(pages)/problems/_components/FilterOptions";
import Badge from "@/app/_components/ui/Buttons/Badge";
import FilterButtons from "@/app/_components/ui/Filters/FilterButtons";
import { ProblemCustumType } from "@/app/_utils/db/prismaTypes";
import { getColumnsProblems } from "./ColumnsProblems";

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

  return (
    <>
      <div className="flex justify-between items-center border-b border-secondary-100/20  px-0 py-2">
        <Headline level={4} className="normal-case  font-thin">
          Prijavljeni problemi <Badge>{problems.length}</Badge>
        </Headline>
        <FilterButtons
          filterList={intervalOptions}
          queryKey="days"
          className="my-0"
        />
      </div>
      <Table
        data={problems}
        columns={getColumnsProblems({})}
        rowKey={(row) => row.id}
        isMiniTable
      />
    </>
  );
};

export default ProblemsByInterval;

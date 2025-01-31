import { Suspense } from "react";
import ChartAllProblems, { ChartAllProblemsSkeleton } from "./ChartAllProblems";
import ChartProblemsByOrganisation, {
  ChartProblemsByOrganisationSkeleton,
} from "./ChartProblemsByOrganisation";

const ChartsProblems = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { chartProblemsFilter = "organisations", organisationId = "1" } =
    await searchParams;

  return (
    <div className="mt-4 w-full 3xl:w-5/6 flex flex-wrap justify-between items-start  pb-8 mb-8">
      <div className="w-full 2xl:w-[47%] min-h-[300px] flex flex-col">
        <Suspense fallback={<ChartAllProblemsSkeleton />}>
          <ChartAllProblems filter={chartProblemsFilter} />
        </Suspense>
      </div>
      <div className="w-full 2xl:w-[47%] min-h-[300px] flex flex-col">
        <Suspense fallback={<ChartProblemsByOrganisationSkeleton />}>
          <ChartProblemsByOrganisation organisationId={organisationId} />{" "}
        </Suspense>
      </div>
    </div>
  );
};

export default ChartsProblems;

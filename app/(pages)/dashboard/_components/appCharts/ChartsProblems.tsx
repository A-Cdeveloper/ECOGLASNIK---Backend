import ChartAllProblems from "./ChartAllProblems";
import ChartProblemsByOrganisation from "./ChartProblemsByOrganisation";

const ChartsProblems = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { chartProblemsFilter = "organisations", organisationId = "1" } =
    await searchParams;

  return (
    <div className="mt-4 w-full 3xl:w-3/4 flex flex-wrap justify-between items-start">
      <div className="w-full 2xl:w-[45%] h-[350px]">
        <ChartAllProblems filter={chartProblemsFilter} />
      </div>
      <div className="w-full 2xl:w-[45%] ">
        <ChartProblemsByOrganisation organisationId={organisationId} />
      </div>
    </div>
  );
};

export default ChartsProblems;

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
    <div className="mt-4 w-full 3xl:w-5/6 flex flex-wrap justify-between items-start  pb-8 mb-8">
      <div className="w-full 2xl:w-[47%]">
        <ChartAllProblems filter={chartProblemsFilter} />
      </div>
      <div className="w-full 2xl:w-[47%]">
        <ChartProblemsByOrganisation organisationId={organisationId} />
      </div>
    </div>
  );
};

export default ChartsProblems;

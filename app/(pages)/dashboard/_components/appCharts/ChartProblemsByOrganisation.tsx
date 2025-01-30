import Pie, { PieChartData } from "@/app/_components/ui/Charts/Pie";
import FilterSelector from "@/app/_components/ui/Filters/FilterSelector";
import Headline from "@/app/_components/ui/Headline";
import NoResurcesFound from "@/app/_components/ui/NoResurcesFound";
import {
  getAllOrganisations,
  getOrganisationProblems,
} from "@/app/_utils/api_utils/organisations";

import { Organisation } from "@prisma/client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ChartProblemsByOrganisation = async ({
  organisationId,
}: {
  organisationId: string;
}) => {
  const { organisations } = (await getAllOrganisations("oid-asc")) as {
    organisations: Organisation[];
  };

  const organisationSelection = organisations?.map((org) => ({
    id: org.oid.toString(),
    label: org.organisation_name,
  }));

  const data = (await getOrganisationProblems(+organisationId)) as
    | PieChartData[]
    | undefined;

  let content = <Pie data={data as PieChartData[]} />;

  if (data?.length === 0) {
    content = (
      <NoResurcesFound className="h-[300px]">
        Podaci nisu dostupni.
      </NoResurcesFound>
    );
  }

  return (
    <>
      <div className="flex flex-wrap justify-between items-center border-y border-secondary-100/20 px-0 py-2">
        <Headline level={3} className="normal-case font-thin w-full md:w-auto">
          Status problema po službama
        </Headline>

        {organisations && (
          <FilterSelector
            filterList={organisationSelection}
            queryKey="organisationId"
            noDefaultLabel={true}
            className="w-full md:w-[250px]"
          />
        )}
      </div>

      {content}
    </>
  );
};

export default ChartProblemsByOrganisation;

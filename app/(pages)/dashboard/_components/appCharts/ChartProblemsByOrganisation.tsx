import PieElement, {
  PieChartData,
} from "@/app/_components/ui/Charts/PieElement";
import FilterOrganisations from "@/app/_components/ui/Filters/FilterOrganisations";
import Headline from "@/app/_components/ui/Headline";
import NoResurcesFound from "@/app/_components/ui/NoResurcesFound";
import {
  PieSkeleton,
  SkeletonTopSection,
} from "@/app/_components/ui/Skeletons";
import { getOrganisationProblemsForCharts } from "@/app/_utils/api_utils/organisations";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ChartProblemsByOrganisation = async ({
  organisationId,
  showHeader = true,
}: {
  organisationId?: string;
  showHeader?: boolean;
}) => {
  let content = (
    <NoResurcesFound className="h-[300px]">
      Podaci nisu dostupni.
    </NoResurcesFound>
  );

  const data = (await getOrganisationProblemsForCharts(+organisationId!)) as
    | PieChartData[]
    | undefined;

  if (data) {
    content = <PieElement data={data as PieChartData[]} />;
  }

  return (
    <>
      {showHeader && (
        <div className="flex flex-wrap justify-between items-center border-y border-secondary-100/20 px-0 py-2">
          <Headline
            level={3}
            className="normal-case font-thin w-full md:w-auto"
          >
            Status problema po službama
          </Headline>

          <FilterOrganisations />
        </div>
      )}

      {content}
    </>
  );
};

export default ChartProblemsByOrganisation;

export const ChartProblemsByOrganisationSkeleton = () => (
  <>
    <SkeletonTopSection />
    <PieSkeleton statNumber={3} />
  </>
);

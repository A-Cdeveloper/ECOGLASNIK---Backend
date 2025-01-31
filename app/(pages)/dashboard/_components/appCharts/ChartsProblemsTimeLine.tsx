import { intervalOptions } from "@/app/(pages)/problems/_components/FilterOptions";
import BarChartElement from "@/app/_components/ui/Charts/BarChartElement";
import NoResurcesFound from "@/app/_components/ui/NoResurcesFound";
import {
  BarChartSkeleton,
  SkeletonTopSection,
} from "@/app/_components/ui/Skeletons";
import { getProblemTrends } from "@/app/_utils/api_utils/problems";
import TopSection from "../appTables/TopSection";

const ChartsProblemsTimeLine = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { interval = "7" } = await searchParams;

  const data = await getProblemTrends(+interval);

  let content = (
    <NoResurcesFound className="h-[300px]">
      Podaci nisu dostupni.
    </NoResurcesFound>
  );

  if (data?.length !== 0) {
    content = <BarChartElement data={data} />;
  }

  return (
    <div className="mt-4 w-full 3xl:w-5/6">
      <TopSection filteredItems={intervalOptions} queryKey="interval">
        Pregled problema po vremenskim intervalima
      </TopSection>
      <div className="w-full h-[350px] py-5">{content}</div>
    </div>
  );
};

export default ChartsProblemsTimeLine;

export const ChartsProblemsTimeLineSkeleton = () => (
  <div className="mt-4 w-full 3xl:w-5/6">
    <SkeletonTopSection />
    <BarChartSkeleton />
  </div>
);

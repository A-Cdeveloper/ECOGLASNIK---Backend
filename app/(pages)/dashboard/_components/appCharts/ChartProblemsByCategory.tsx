import PieElement, {
  PieChartData,
} from "@/app/_components/ui/Charts/PieElement";
import NoResurcesFound from "@/app/_components/ui/NoResurcesFound";
import { PieSkeleton } from "@/app/_components/ui/Skeletons";
import { getSingleCategoryProblems } from "@/app/_utils/api_utils/categories";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ChartProblemsByCategory = async ({ catId }: { catId: string }) => {
  const data = (await getSingleCategoryProblems(+catId)) as
    | PieChartData[]
    | undefined;

  let content = (
    <NoResurcesFound className="h-[300px]">
      Podaci nisu dostupni.
    </NoResurcesFound>
  );

  if (data && data[0].value !== 0) {
    content = <PieElement data={data as PieChartData[]} />;
  }

  return <>{content}</>;
};

export default ChartProblemsByCategory;

export const ChartProblemsByCategorySkeleton = () => (
  <>
    <PieSkeleton statNumber={3} />
  </>
);

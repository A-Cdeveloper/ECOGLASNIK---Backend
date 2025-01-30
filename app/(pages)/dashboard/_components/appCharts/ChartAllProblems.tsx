import PieElement, {
  PieChartData,
} from "@/app/_components/ui/Charts/PieElement";
import FilterButtons from "@/app/_components/ui/Filters/FilterButtons";
import Headline from "@/app/_components/ui/Headline";
import NoResurcesFound from "@/app/_components/ui/NoResurcesFound";
import { getAllCategoriesProblems } from "@/app/_utils/api_utils/categories";
import { getAllOrganisationsProblems } from "@/app/_utils/api_utils/organisations";

const ChartAllProblems = async ({ filter }: { filter: string }) => {
  const dataAllProblems =
    filter === "organisations"
      ? await getAllOrganisationsProblems()
      : await getAllCategoriesProblems();

  let content = <PieElement data={dataAllProblems as PieChartData[]} />;

  if (dataAllProblems?.length === 0) {
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
          Raspored problema po{" "}
          {filter === "organisations" ? "službama" : "kategorijama"}
        </Headline>

        <FilterButtons
          filterList={[
            { value: "", label: "Službe" },
            { value: "categories", label: "Kategorije" },
          ]}
          queryKey="chartProblemsFilter"
          className="my-2 xl:my-1 w-full md:w-auto text-[11px]"
        />
      </div>

      {content}
    </>
  );
};

export default ChartAllProblems;

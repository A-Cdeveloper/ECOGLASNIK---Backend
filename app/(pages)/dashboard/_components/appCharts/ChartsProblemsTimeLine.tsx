import BarChartElement from "@/app/_components/ui/Charts/BarChartElement";
import React from "react";
import TopSection from "../appTables/TopSection";
import { intervalOptions } from "@/app/(pages)/problems/_components/FilterOptions";
import { getProblemTrends } from "@/app/_utils/api_utils/problems";
import NoResurcesFound from "@/app/_components/ui/NoResurcesFound";

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
    <div className="mt-4 w-full 3xl:w-3/4">
      <TopSection filteredItems={intervalOptions} queryKey="interval">
        Pregled problema po vremenskim intervalima
      </TopSection>
      <div className="w-full h-[350px] py-5">{content}</div>
    </div>
  );
};

export default ChartsProblemsTimeLine;

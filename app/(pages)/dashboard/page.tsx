import Headline from "@/app/_components/ui/Headline";

import { getUserFromToken } from "@/app/(auth)/_actions";

import ChartsProblems from "./_components/appCharts/ChartsProblems";
import ChartsProblemsTimeLine, {
  ChartsProblemsTimeLineSkeleton,
} from "./_components/appCharts/ChartsProblemsTimeLine";
import GeneralStats from "./_components/appStats/GeneralStats";
import TableStats from "./_components/appTables/TableStats";
import { Suspense } from "react";
import { SkeletonGeneralStats } from "@/app/_components/ui/Skeletons";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { user } = (await getUserFromToken()) ?? { user: null };

  return (
    <>
      <Headline level={1} className="normal-case">
        Dobro došli, {user?.firstname} {user?.lastname}
      </Headline>
      <Suspense fallback={<SkeletonGeneralStats boxNumber={4} />}>
        <GeneralStats />
      </Suspense>
      <TableStats searchParams={searchParams} />
      <ChartsProblems searchParams={searchParams} />
      <Suspense fallback={<ChartsProblemsTimeLineSkeleton />}>
        <ChartsProblemsTimeLine searchParams={searchParams} />{" "}
      </Suspense>
    </>
  );
}

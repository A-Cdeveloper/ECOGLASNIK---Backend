import Headline from "@/app/_components/ui/Headline";

import { getUserFromToken } from "@/app/(auth)/_actions";
import { UserRestrictedType } from "@/app/_utils/db/prismaTypes";
import GeneralStats from "./_components/appStats/GeneralStats";
import TableStats from "./_components/appTables/TableStats";
//import ChartTimeLine from "./_components/appCharts/ChartTimeLine";
import ChartsProblems from "./_components/appCharts/ChartsProblems";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { user } = (await getUserFromToken()) as unknown as {
    user: UserRestrictedType;
  };

  return (
    <>
      <Headline level={1} className="normal-case">
        Dobro došli, {user?.firstname} {user?.lastname}
      </Headline>

      <GeneralStats />

      <TableStats searchParams={searchParams} />

      <ChartsProblems searchParams={searchParams} />
      {/* <div className="mt-4 w-full 3xl:w-3/4 flex flex-wrap justify-between items-start">
        <div className="w-full  h-[400px]">
          <ChartTimeLine />
        </div>{" "}
      </div> */}
    </>
  );
}

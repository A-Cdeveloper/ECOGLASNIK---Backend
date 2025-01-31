import Headline from "@/app/_components/ui/Headline";

import { getUserFromToken } from "@/app/(auth)/_actions";
import { UserRestrictedType } from "@/app/_utils/db/prismaTypes";
import ChartsProblems from "./_components/appCharts/ChartsProblems";
import ChartsProblemsTimeLine from "./_components/appCharts/ChartsProblemsTimeLine";
import GeneralStats from "./_components/appStats/GeneralStats";
import TableStats from "./_components/appTables/TableStats";

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

      <ChartsProblemsTimeLine searchParams={searchParams} />
    </>
  );
}

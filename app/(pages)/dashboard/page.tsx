import Headline from "@/app/_components/ui/Headline";

import { getUserFromToken } from "@/app/(auth)/_actions";
import { UserRestrictedType } from "@/app/_utils/db/prismaTypes";
import ChartProblemsOrganisations from "./_components/appCharts/ChartProblemsOrganisations";
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

      <div className="mt-4 w-full 2xl:w-3/4 space-y-2 flex justify-between items-center ">
        <ChartProblemsOrganisations />
      </div>
    </>
  );
}

import Headline from "@/app/_components/ui/Headline";

import { getUserFromToken } from "@/app/(auth)/_actions";
import { UserRestrictedType } from "@/app/_utils/db/prismaTypes";
import GeneralStats from "./_components/appStats/GeneralStats";
import ProblemsByInterval from "./_components/newProblems/ProblemsByInterval";
import OnlineUsers from "./_components/onlineUsers/OnlineUsers";

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
      <div className="mt-4 w-full lg:w-3/4 flex justify-between items-start gap-x-8 overflow-hidden">
        <div className="w-1/2 self-stretch">
          <OnlineUsers searchParams={searchParams} />
        </div>
        <div className="w-1/2">
          <ProblemsByInterval searchParams={searchParams} />
        </div>
      </div>

      <div className="mt-4 w-full 2xl:w-3/4 space-y-2 flex justify-between items-center bg-rose-500">
        grafici
        <div>problemi po kategorijama</div>
        <div>problemi po vremenu </div>
        <div>problemi po organizacijama</div>
      </div>
    </>
  );
}

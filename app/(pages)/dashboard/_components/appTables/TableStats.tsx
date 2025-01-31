import React, { Suspense } from "react";
import OnlineUsers, { OnlineUsersSkeleton } from "./OnlineUsers";
import ProblemsByInterval, {
  ProblemsByIntervalSkeleton,
} from "./ProblemsByInterval";

const TableStats = ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  return (
    <div className="mt-4 w-full 3xl:w-5/6 flex flex-wrap justify-between items-start gap-x-4 overflow-hidden my-8 h-auto 2xl:h-[300px]">
      <div className="w-full xl:w-[47%] self-stretch mb-8 xl:mb-0">
        <Suspense fallback={<OnlineUsersSkeleton />}>
          <OnlineUsers searchParams={searchParams} />
        </Suspense>
      </div>
      <div className="w-full xl:w-[47%] self-stretch mb-8 xl:mb-0">
        <Suspense fallback={<ProblemsByIntervalSkeleton />}>
          <ProblemsByInterval searchParams={searchParams} />{" "}
        </Suspense>
      </div>
    </div>
  );
};

export default TableStats;

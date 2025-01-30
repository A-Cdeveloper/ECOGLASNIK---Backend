import React from "react";
import OnlineUsers from "./OnlineUsers";
import ProblemsByInterval from "./ProblemsByInterval";

const TableStats = ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  return (
    <div className="mt-4 w-full 3xl:w-3/4 flex flex-wrap justify-between items-start gap-x-4 overflow-hidden my-8 h-auto 2xl:h-[300px]">
      <div className="w-full xl:w-[45%] self-stretch mb-8 xl:mb-0">
        <OnlineUsers searchParams={searchParams} />
      </div>
      <div className="w-full xl:w-[45%] self-stretch mb-8 xl:mb-0">
        <ProblemsByInterval searchParams={searchParams} />
      </div>
    </div>
  );
};

export default TableStats;

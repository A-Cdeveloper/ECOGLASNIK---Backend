import React from "react";
import OnlineUsers from "./OnlineUsers";
import ProblemsByInterval from "./ProblemsByInterval";

const TableStats = ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  return (
    <div className="mt-4 w-full 3xl:w-3/4 flex flex-wrap justify-between items-start gap-x-4 overflow-hidden ">
      <div className="w-full xl:w-[48%] self-stretch">
        <OnlineUsers searchParams={searchParams} />
      </div>
      <div className="w-full xl:w-[48%]">
        <ProblemsByInterval searchParams={searchParams} />
      </div>
    </div>
  );
};

export default TableStats;

"use client";

import { calculatePercentage } from "@/app/_utils/helpers/";
import React from "react";
import StatBox from "./StatBox";
import useProblemStats from "@/app/hooks/useProblemStats";
import { Problem } from "@prisma/client";

const Stats = ({
  items,
  statFilter,
  statParam,
}: {
  items: Problem[];
  statFilter?: number;
  statParam?: string;
}) => {
  const { total, active, done, waiting } = useProblemStats(items as Problem[]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-4 gap-y-3 w-full 2xl:w-[80%]  3xl:w-[70%] gap-x-4 items-center uppercase">
      <StatBox
        numberofProblems={total}
        goto={
          statParam
            ? `/${statParam}?${statFilter ? `category=${statFilter}` : ""}`
            : "#"
        }
        classname="text-skyblue-100 border-skyblue-100"
      >
        Ukupno
      </StatBox>
      <StatBox
        numberofProblems={active}
        goto={
          statParam
            ? `/${statParam}?status=active${
                statFilter ? `&category=${statFilter}` : ""
              }`
            : "#"
        }
        classname="text-danger-100 border-danger-100"
      >
        Aktivno ({total && active && calculatePercentage(active, total)}
        %)
      </StatBox>
      <StatBox
        numberofProblems={done}
        goto={
          statParam
            ? `/${statParam}?status=done${
                statFilter ? `&category=${statFilter}` : ""
              }`
            : "#"
        }
        classname="text-success-200 border-success-200"
      >
        Rešeno ({total && done && calculatePercentage(done, total)}
        %)
      </StatBox>
      <StatBox
        numberofProblems={waiting}
        goto={
          statParam
            ? `/${statParam}?status=waiting${
                statFilter ? `&category=${statFilter}` : ""
              }`
            : "#"
        }
        classname="text-skyblue-200 border-skyblue-200"
      >
        Obrada
      </StatBox>
    </div>
  );
};

export default Stats;

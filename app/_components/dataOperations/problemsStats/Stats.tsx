"use client";

import { calculatePercentage } from "@/app/_utils/helpers/";
import React from "react";
import StatBox from "./StatBox";
import useProblemStats from "@/app/hooks/useProblemStats";
import { Problem, ProblemStatus } from "@prisma/client";

const Stats = ({
  items,
  statFilter,
  statParam,
}: {
  items: Problem[];
  statFilter?: number;
  statParam?: string;
}) => {
  const {
    total,
    [ProblemStatus.ACTIVE]: ACTIVE,
    [ProblemStatus.DONE]: DONE,
    [ProblemStatus.WAITING]: WAITING,
  } = useProblemStats(items);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-4 gap-y-3 w-full 2xl:w-[80%] 3xl:w-[70%] gap-x-4 items-center uppercase">
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
        numberofProblems={ACTIVE}
        goto={
          statParam
            ? `/${statParam}?status=${ProblemStatus.ACTIVE.toLowerCase()}${
                statFilter ? `&category=${statFilter}` : ""
              }`
            : "#"
        }
        classname="text-danger-100 border-danger-100"
      >
        Aktivno ({total && ACTIVE ? calculatePercentage(ACTIVE, total) : 0}%)
      </StatBox>

      <StatBox
        numberofProblems={DONE}
        goto={
          statParam
            ? `/${statParam}?status=${ProblemStatus.DONE.toLowerCase()}${
                statFilter ? `&category=${statFilter}` : ""
              }`
            : "#"
        }
        classname="text-success-200 border-success-200"
      >
        Rešeno ({total && DONE ? calculatePercentage(DONE, total) : 0}%)
      </StatBox>

      <StatBox
        numberofProblems={WAITING}
        goto={
          statParam
            ? `/${statParam}?status=${ProblemStatus.WAITING.toLowerCase()}${
                statFilter ? `&category=${statFilter}` : ""
              }`
            : "#"
        }
        classname="text-skyblue-200 border-skyblue-200"
      >
        Obrada ({total && WAITING ? calculatePercentage(WAITING, total) : 0}%)
      </StatBox>
    </div>
  );
};

export default Stats;

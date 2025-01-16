"use client";

import { calculatePercentage } from "@/app/_utils/helpers";
import React from "react";
import StatBox from "./StatBox";
import useProblemStats from "@/app/hooks/useProblemStats";
import { Problem } from "@prisma/client";

const Stats = ({ items }: { items: Problem[] }) => {
  const { total, active, done, archive } = useProblemStats(items);

  return (
    <div className="grid grid-cols-[1fr_1fr_1fr_1fr] mt-4 gap-y-3 w-full 2xl:w-[50%] gap-x-4 items-center uppercase ">
      <StatBox totalProblems={total} color="skyblue-100">
        Ukupno
      </StatBox>
      <StatBox totalProblems={active} color="danger-100">
        Aktivno
      </StatBox>
      <StatBox totalProblems={done} color="turquoise-100">
        Rešeno ({total && done && calculatePercentage(done, total)}
        %)
      </StatBox>
      <StatBox totalProblems={archive} color="secondary-100/50">
        Arhiva
      </StatBox>
    </div>
  );
};

export default Stats;

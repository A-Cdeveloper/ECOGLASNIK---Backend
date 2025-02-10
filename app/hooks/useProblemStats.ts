import { useMemo } from "react";
import { Problem, ProblemStatus } from "@prisma/client";

type ProblemStatusWithTotal = Record<ProblemStatus, number> & { total: number };

const useProblemStats = (problems?: Problem[]) => {
  const totals = useMemo(() => {
    return problems?.reduce<ProblemStatusWithTotal>(
      (acc, problem) => {
        if (problem.status !== ProblemStatus.ARCHIVE) {
          acc.total += 1;
        }
        acc[problem.status] += 1;
        return acc;
      },
      {
        total: 0,
        [ProblemStatus.ACTIVE]: 0,
        [ProblemStatus.DONE]: 0,
        [ProblemStatus.ARCHIVE]: 0,
        [ProblemStatus.WAITING]: 0,
      } as ProblemStatusWithTotal
    );
  }, [problems]);

  return (
    totals || {
      total: 0,
      [ProblemStatus.ACTIVE]: 0,
      [ProblemStatus.DONE]: 0,
      [ProblemStatus.ARCHIVE]: 0,
      [ProblemStatus.WAITING]: 0,
    }
  );
};

export default useProblemStats;

import { useMemo } from "react";
import { statuses } from "../(pages)/problems/_components/FilterOptions";

type Problem = {
  status: string;
};

const useProblemStats = <T extends Problem>(problems?: T[]) => {
  const totals = useMemo(() => {
    return problems?.reduce(
      (acc, problem) => {
        statuses.forEach((status) => {
          if (problem.status === status.value) {
            if (status.value !== "archive") {
              acc.total += 1;
            }
            acc[status.value as "active" | "done" | "archive"] += 1;
          }
        });

        return acc;
      },
      { total: 0, active: 0, done: 0, archive: 0 }
    );
  }, [problems]);

  return totals || { total: 0, active: 0, done: 0, archive: 0 }; // Default return if problems is undefined
};

export default useProblemStats;

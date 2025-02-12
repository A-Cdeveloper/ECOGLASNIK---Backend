import { ProblemStatus } from "@prisma/client";

const StatusBadge = ({
  status,
  className,
}: {
  status: string;
  className?: string;
}) => {
  let badgeClass;
  let badgeLabel;

  switch (status) {
    case ProblemStatus.ACTIVE:
      badgeClass = "bg-red-500";
      badgeLabel = "AKTIVNO";
      break;
    case ProblemStatus.DONE:
      badgeClass = "bg-success-200";
      badgeLabel = "REŠENO";
      break;
    case ProblemStatus.ARCHIVE:
      badgeClass = "bg-warrning-500";
      badgeLabel = "ARHIVIRANO";
      break;

    case ProblemStatus.WAITING:
      badgeClass = "bg-skyblue-200";
      badgeLabel = "U OBRADI";
      break;
  }

  return (
    <span
      className={`${badgeClass} ${className} max-w-[85px] py-[3px] font-bold text-[11px] text-center`}
    >
      {badgeLabel}
    </span>
  );
};

export default StatusBadge;

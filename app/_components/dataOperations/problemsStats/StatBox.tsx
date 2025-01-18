import clsx from "clsx";
import Link from "next/link";
import React from "react";

const StatBox = ({
  numberofProblems,
  children,
  classname,
  goto,
}: {
  numberofProblems: number;
  children: React.ReactNode;
  classname: string;
  goto: string;
}) => {
  const content = (
    <div
      className={clsx(
        "border-b-2 text-center flex items-end gap-x-2 font-semibold",
        classname
      )}
    >
      <span className="block text-3xl min-w-[30px]">{numberofProblems}</span>
      <p className="text-[15px] 2xl:text-[17px] mb-[7px]">{children}</p>
    </div>
  );

  if (goto !== "#") {
    return <Link href={goto}>{content}</Link>;
  }

  return <>{content}</>;
};

export default StatBox;

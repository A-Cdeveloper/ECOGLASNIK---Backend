import React from "react";

const StatBox = ({
  totalProblems,
  children,
  color,
}: {
  totalProblems: number;
  children: React.ReactNode;
  color: "skyblue-100" | "danger-100" | "secondary-100/50" | "turquoise-100";
}) => {
  return (
    <div
      className={`border-b-2 border-${color} text-center flex items-end  gap-x-2 text-${color} font-semibold`}
    >
      <span className="block text-3xl">{totalProblems}</span>
      <p className="text-[17px] mb-[6px]">{children}</p>
    </div>
  );
};

export default StatBox;

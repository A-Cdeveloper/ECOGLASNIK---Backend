import clsx from "clsx";
import React from "react";

const NoResurcesFound = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        "w-full  h-full flex-1 flex flex-col justify-center items-center",
        className
      )}
    >
      {children}
    </div>
  );
};

export default NoResurcesFound;

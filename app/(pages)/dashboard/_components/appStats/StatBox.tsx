import Link from "next/link";
import React from "react";

const StatBox = ({
  total,
  label,
  icon,
  link,
}: {
  total: number;
  label: string;
  icon: JSX.Element;
  link?: string;
}) => {
  return (
    <Link
      href={`/${link}`}
      className="flex border border-secondary-900 hover:border-winter-100/80 rounded-md px-2 py-[10px]  justify-start items-center gap-x-3 cursor-pointer group transition-all duration-500"
    >
      {React.cloneElement(icon, {
        className: `text-[35px] sm:text-[40px] xl:text-[45px] text-secondary-900 min-w-auto xl:min-w-[45px] group-hover:text-winter-100/80`,
      })}
      <div className="text-lg font-bold text-secondary-500/50 group-hover:text-winter-100/80">
        <span className="text-2xl text-winter-100/80 inline-block sm:block leading-none">
          {total}
        </span>{" "}
        <span className="uppercase group-hover:text-winter-100/80 text-[13px] md:text-[16px]">
          {label}
        </span>
      </div>
    </Link>
  );
};

export default StatBox;

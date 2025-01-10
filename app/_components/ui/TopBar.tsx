import Link from "next/link";
import { ReactNode } from "react";

const TopBar = ({
  children,
  count,
}: {
  children: ReactNode;
  count: number;
}) => {
  return (
    <div className="flex flex-wrap justify-start sm:justify-between items-center mt-6 w-full 2xl:w-3/4">
      <div className="bg-secondary-500 inline-block px-2 py-[4px] text-primary-900 text-[13px]">
        Ukupno: {count}
      </div>
      <div className="flex gap-x-2 items-center">{children}</div>
    </div>
  );
};

export const AddNew = ({
  children,
  linkToNew,
}: {
  children: ReactNode;
  linkToNew: string;
}) => {
  return (
    <Link href={linkToNew} className="button info small mt-0">
      {children}
    </Link>
  );
};

export default TopBar;

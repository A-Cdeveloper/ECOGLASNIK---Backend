"use client";

import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";

type FilterButtonProps = {
  activeStatus: string;
  children: React.ReactNode;
  queryKey: string;
};

const FilterButton = ({
  activeStatus,
  children,
  queryKey,
}: FilterButtonProps) => {
  const searchParams = useSearchParams();
  const currentStatus = searchParams?.get(queryKey) || "";

  const router = useRouter();

  const handleStatusChange = (option: string) => {
    const currentParams = new URLSearchParams(searchParams?.toString() || "");

    const queryValue = option;

    if (queryValue) {
      currentParams.set(queryKey, queryValue); // Set the query parameter
      currentParams.delete("page");
    } else {
      currentParams.delete(queryKey); // Remove the query parameter if empty
    }

    router.push(`?${currentParams.toString()}`); // Update the URL
  };

  const buttonClass =
    "text-winter-100/70 border border-secondary-500/30 font-normal px-2 py-[3px] scale-100 hover:border-secondary-500/80 hover:text-winter-500/80 hover:bg-secondary-500/90 hover:text-primary-900 text-[12px]";
  const activeButtonClass = clsx(
    buttonClass,
    "border-secondary-500/80 font-semibold bg-secondary-500/90 text-primary-900"
  );

  return (
    <button
      className={`${
        currentStatus === activeStatus ? activeButtonClass : buttonClass
      }`}
      onClick={() => handleStatusChange(activeStatus)}
    >
      {children}
    </button>
  );
};

export default FilterButton;

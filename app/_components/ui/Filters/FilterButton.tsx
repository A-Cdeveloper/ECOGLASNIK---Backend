"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

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

  useEffect(() => {
    // Set scrollRestoration to manual to prevent page jumping
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      console.log("manual");
    }
  }, []);

  const handleStatusChange = (option: string) => {
    const currentParams = new URLSearchParams(searchParams?.toString() || "");
    const queryValue = option;

    if (queryValue) {
      currentParams.set(queryKey, queryValue); // Set the query parameter
    } else {
      currentParams.delete(queryKey); // Remove the query parameter if empty
    }

    // You can use router.push to update the URL
    router.replace(`?${currentParams.toString()}`, { scroll: false });

    // Prevent page jumping by explicitly scrolling
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0); // Optionally adjust this for specific scroll behavior
    }
  };

  const buttonClass =
    "text-winter-100/70 border border-secondary-500/30 font-normal px-2 py-[3px] scale-100 hover:border-secondary-500/80 hover:text-winter-500/80 hover:bg-secondary-500/90 hover:text-primary-900 text-[12px]";
  const activeButtonClass = `${buttonClass} border-secondary-500/80 font-semibold bg-secondary-500/90 text-primary-900`;

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

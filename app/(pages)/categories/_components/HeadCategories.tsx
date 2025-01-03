import SortFilter from "@/app/_components/ui/Filters/SortFilter";
import React from "react";
import { sortOptions } from "./SortOptions";
import Link from "next/link";

const HeadCategories = () => {
  return (
    <>
      <div className="flex flex-wrap justify-center md:justify-between items-center mt-6 w-full 2xl:w-3/4">
        <SortFilter options={sortOptions} defaultSort="cat_id-asc" />
        <Link href="/categories/new" className="button info small mt-2 md:mt-0">
          Nova kategorija
        </Link>
      </div>
    </>
  );
};

export default HeadCategories;

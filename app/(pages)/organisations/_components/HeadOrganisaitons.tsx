import SortFilter from "@/app/_components/ui/Filters/SortFilter";
import Link from "next/link";
import { sortOptions } from "./SortOptions";

const HeadOrganisaitons = () => {
  return (
    <>
      <div className="flex flex-wrap justify-center md:justify-between items-center mt-6 w-full 2xl:w-3/4">
        <SortFilter options={sortOptions} defaultSort="cat_id-asc" />
        <Link
          href="/organisations/new"
          className="button info small mt-2 md:mt-0"
        >
          Nova Služba
        </Link>
      </div>
    </>
  );
};

export default HeadOrganisaitons;

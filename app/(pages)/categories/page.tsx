/* eslint-disable @typescript-eslint/no-explicit-any */
import Loader from "@/app/_components/ui/Loader";
import { Suspense } from "react";
import Headline from "../../_components/ui/Headline";
import AllCategories from "./_components/AllCategories";
import SortFilter from "@/app/_components/ui/Filters/SortFilter";
import { sortOptions } from "./_components/SortOptions";

const CategoriesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { sortBy } = await searchParams;

  return (
    <>
      <Headline level={1}>Kategorije problema</Headline>
      <Suspense fallback={<Loader />}>
        <SortFilter options={sortOptions} defaultSort="cat_id-asc" />
        <AllCategories sortBy={sortBy} />
      </Suspense>
    </>
  );
};

export default CategoriesPage;

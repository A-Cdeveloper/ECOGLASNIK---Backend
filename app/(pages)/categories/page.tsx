import { Suspense } from "react";

import Headline from "@/app/_components/ui/Headline";
import AllCategories, {
  AllCategoriesSkeleton,
} from "./_components/AllCategories";

const CategoriesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  return (
    <>
      <Headline level={1}>Kategorije</Headline>
      <Suspense fallback={<AllCategoriesSkeleton />}>
        <AllCategories searchParams={searchParams} />
      </Suspense>
    </>
  );
};

export default CategoriesPage;

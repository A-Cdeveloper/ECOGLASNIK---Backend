import { Suspense } from "react";

import Headline from "@/app/_components/ui/Headline";
import AllCategories, {
  AllCategoriesSkeleton,
} from "./_components/AllCategories";
import { authSecurityPatch } from "@/app/_utils/auth/authSecurityPatch";

const CategoriesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  await authSecurityPatch();
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

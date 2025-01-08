import Loader from "@/app/_components/ui/Loader";
import PageTopbar from "@/app/_components/ui/PageTopbar";
import { getAllCategories } from "@/app/_utils/api_utils/categories";
import { ProblemCategoriesType } from "@/app/_utils/db/prismaTypes";
import Link from "next/link";
import { Suspense } from "react";
import Headline from "../../_components/ui/Headline";
import AllCategories from "./_components/AllCategories";
import { sortOptions } from "./_components/SortOptions";

const CategoriesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { sortBy } = await searchParams;
  const categories = (await getAllCategories(
    sortBy
  )) as ProblemCategoriesType[];

  // test const categories = [] as ProblemCategoriesType[];

  let content = (
    <Link
      href="/categories/new"
      className="button info small mt-5 inline-block"
    >
      Dodaj novu kategoriju
    </Link>
  );

  if (categories.length !== 0) {
    content = (
      <Suspense fallback={<Loader />}>
        <PageTopbar
          sortOptions={sortOptions}
          linkToNew="/categories/new"
          defaultSort="cat_id-asc"
        >
          Nova kategorija
        </PageTopbar>
        <AllCategories categories={categories} />
      </Suspense>
    );
  }

  return (
    <>
      <Headline level={1}>Kategorije problema</Headline>
      {content}
    </>
  );
};

export default CategoriesPage;

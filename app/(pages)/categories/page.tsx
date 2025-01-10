import Loader from "@/app/_components/ui/Loader";

import SortSelector from "@/app/_components/ui/Sorting/SortSelector";
import TopBar, { AddNew } from "@/app/_components/ui/TopBar";
import { getAllCategories } from "@/app/_utils/api_utils/categories";
import { ProblemCategoriesType } from "@/app/_utils/db/prismaTypes";
import Link from "next/link";
import { Suspense } from "react";
import Headline from "../../_components/ui/Headline";
import AllCategories from "./_components/AllCategories";
import { sortOptions } from "./_components/SortOptions";
import NoResurcesFound from "@/app/_components/ui/NoResurcesFound";

const CategoriesPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { sortBy } = await searchParams;
  const categories = (await getAllCategories(
    sortBy
  )) as ProblemCategoriesType[];

  //const categories = [] as ProblemCategoriesType[];

  let content = (
    <>
      <NoResurcesFound>
        <>
          <Headline level={3}> Nema registrovanih kategorija.</Headline>
          <Link
            href="/categories/new"
            className="button info small mt-5 inline-block"
          >
            Dodaj novu kategoriju
          </Link>
        </>
      </NoResurcesFound>
    </>
  );

  if (categories.length !== 0) {
    content = (
      <>
        <Headline level={1}>Kategorije problema</Headline>
        <Suspense fallback={<Loader />}>
          <TopBar count={categories.length}>
            <SortSelector options={sortOptions} defaultSort="cat_id-asc" />

            <AddNew linkToNew="/categories/new">Nova kategorija</AddNew>
          </TopBar>
          <AllCategories categories={categories} />
        </Suspense>
      </>
    );
  }

  return <>{content}</>;
};

export default CategoriesPage;

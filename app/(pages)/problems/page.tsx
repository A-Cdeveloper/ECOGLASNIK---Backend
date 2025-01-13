import Loader from "@/app/_components/ui/Loader";
import { Suspense } from "react";
import Headline from "../../_components/ui/Headline";
import FilterButtons from "@/app/_components/ui/Filters/FilterButtons";
import FilterSelector from "@/app/_components/ui/Filters/FilterSelector";
import SortSelector from "@/app/_components/ui/Sorting/SortSelector";
import TopBar from "@/app/_components/ui/TopBar";
import { getAllProblems } from "@/app/_utils/api_utils/problems";
import { ProblemCustumType } from "@/app/_utils/db/prismaTypes";
import AllProblems from "./_components/AllProblems";
import { problemStatusOptions } from "./_components/FilterOptions";
import { sortOptions } from "./_components/SortOptions";
import NoResurcesFound from "@/app/_components/ui/NoResurcesFound";
import { getAllCategories } from "@/app/_utils/api_utils/categories";
import Pagination from "@/app/_components/ui/Pagination/Pagination";
import { MAX_PAGE_SIZE } from "@/app/_utils/contants";

const ProblemsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const {
    sortBy = "createdAt-desc",
    status,
    category,
    page = "1",
  } = await searchParams;

  const currentPage = parseInt(page, 10) || 1;

  // Fetch problems with pagination
  const { problems, totalProblems } = (await getAllProblems(
    sortBy,
    status,
    category,
    (currentPage - 1) * MAX_PAGE_SIZE,
    MAX_PAGE_SIZE
  )) as {
    problems: ProblemCustumType[];
    totalProblems: number;
  };

  const totalPages = Math.ceil(totalProblems / MAX_PAGE_SIZE);

  const { categories: categoriesApi } = (await getAllCategories()) as {
    categories: { cat_id: number; cat_name: string }[];
  };

  const categoriesSelection = categoriesApi?.map((cat) => {
    return {
      id: cat.cat_id.toString(),
      label: cat.cat_name,
    };
  });

  let content = (
    <NoResurcesFound className="h-1/3 2xl:w-3/4">
      <Headline level={3}>Nema registrovanih prijava.</Headline>
    </NoResurcesFound>
  );

  if (problems.length !== 0) {
    content = (
      <Suspense fallback={<Loader />}>
        {totalPages > 1 && (
          <Pagination totalPages={totalPages} currentPage={currentPage} />
        )}
        <AllProblems problems={problems} />
      </Suspense>
    );
  }

  return (
    <>
      <Headline level={1}>Lista problema</Headline>
      <TopBar count={totalProblems}>
        <FilterButtons filterList={problemStatusOptions} queryKey="status" />
        <FilterSelector
          filterList={categoriesSelection || []}
          queryKey="category"
        />
        <SortSelector options={sortOptions} defaultSort="id-asc" />
      </TopBar>
      {content}
    </>
  );
};

export default ProblemsPage;

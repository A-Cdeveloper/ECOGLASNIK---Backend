/* eslint-disable @typescript-eslint/no-explicit-any */
import BackButton from "@/app/_components/ui/Buttons/BackButton";
import Headline from "@/app/_components/ui/Headline";
import Table from "@/app/_components/ui/Tables/Table";
import { getCategoryById } from "@/app/_utils/api_utils/categories";
import { getColumnsOrganisations } from "../../organisations/_components/ColumnsOrganisations";
import { getColumnsProblems } from "../../problems/_components/ColumnsProblems";
import { calculatePercentage } from "@/app/_utils/helpers";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ cat_id: string }>;
}) => {
  const { cat_id } = await params;
  const category = await getCategoryById(+cat_id);

  const totalProblems = category?.problems?.reduce(
    (total, problem) => (problem.status !== "archive" ? total + 1 : total),
    0
  );

  const totalActiveProblems = category?.problems?.reduce(
    (total, problem) => (problem.status === "active" ? total + 1 : total),
    0
  );
  const totalDoneProblems = category?.problems?.reduce(
    (total, problem) => (problem.status === "done" ? total + 1 : total),
    0
  );

  const totalArchiveProblems = category?.problems?.reduce(
    (total, problem) => (problem.status === "archive" ? total + 1 : total),
    0
  );

  return (
    <>
      <BackButton to="/categories" />

      <Headline level={1}>{category?.cat_name}</Headline>

      <div className="grid grid-cols-[1fr_1fr_1fr_1fr] mt-4 gap-y-3 w-full 2xl:w-[50%] gap-x-4 items-center uppercase ">
        <div className="border-b-2 border-skyblue-100 text-center flex items-end  gap-x-2 text-skyblue-100 font-semibold ">
          <span className="block text-3xl">{totalProblems}</span>
          <p className="text-[17px] mb-[6px]">Ukupno</p>
        </div>
        <div className="border-b-2 border-danger-100 text-center flex items-end  gap-x-2 text-danger-100 font-semibold ">
          <span className="block text-3xl">{totalActiveProblems}</span>
          <p className="text-[17px] mb-[6px]">Aktivno</p>
        </div>
        <div className="border-b-2 border-turquoise-100 text-center flex items-end  gap-x-2 text-turquoise-100 font-semibold ">
          <span className="block text-3xl text-turquoise-100">
            {totalDoneProblems}
          </span>
          <p className="text-[17px] mb-[6px]">
            Rešeno (
            {totalProblems &&
              totalDoneProblems &&
              calculatePercentage(totalDoneProblems, totalProblems)}
            %)
          </p>
        </div>
        <div className="border-b-2 border-secondary-100/50 text-center flex items-end  gap-x-2 text-secondary-100/50 font-semibold ">
          <span className="block text-3xl">{totalArchiveProblems}</span>
          <p className="text-[17px] mb-[6px]">Arhiva</p>
        </div>
      </div>

      <div className="my-8 w-full 2xl:w-3/4">
        {/* <Suspense fallback={<CategoryProblemsSkeleton />}>
          <CategoryProblems problems={category?.problems || []} />
        </Suspense> */}
        <Table
          data={category?.problems || []}
          columns={getColumnsProblems({
            image: false,
            category: false,
            operations: false,
          })}
          rowKey={(row) => row.id}
        />
      </div>

      <div className="my-8 w-full 2xl:w-3/4">
        <Table
          data={category?.organisations || []}
          columns={getColumnsOrganisations({
            id: false,
            category: false,
            operations: false,
            contactData: false,
          })}
          rowKey={(row) => row.oid}
        />
      </div>
    </>
  );
};

export default CategoryPage;

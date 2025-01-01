import Table from "@/app/_components/ui/Tables/Table";
import { getAllCategories } from "@/app/_utils/api_utils/categories";
import { ProblemCategoriesType } from "@/app/_utils/db/prismaTypes";
import { columns } from "./Columns";

const AllCategories = async ({ sortBy }: { sortBy?: string }) => {
  const categories = (await getAllCategories(
    sortBy
  )) as ProblemCategoriesType[];

  return (
    <>
      <div className="overflow-x-auto">
        <Table
          data={categories}
          columns={columns}
          rowKey={(row) => row.cat_id}
        />
      </div>
    </>
  );
};

export default AllCategories;

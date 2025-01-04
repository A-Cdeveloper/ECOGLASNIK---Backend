import Table from "@/app/_components/ui/Tables/Table";
import { ProblemCategoriesType } from "@/app/_utils/db/prismaTypes";
import { columns } from "./Columns";

const AllCategories = async ({
  categories,
}: {
  categories: ProblemCategoriesType[];
}) => {
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

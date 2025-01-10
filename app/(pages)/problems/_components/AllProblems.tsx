import Table from "@/app/_components/ui/Tables/Table";
import { ProblemCustumType } from "@/app/_utils/db/prismaTypes";
import { columns } from "./Columns";

const AllProblems = async ({ problems }: { problems: ProblemCustumType[] }) => {
  return (
    <>
      <div className="overflow-x-auto">
        <Table data={problems} columns={columns} rowKey={(row) => row.id} />
      </div>
    </>
  );
};

export default AllProblems;

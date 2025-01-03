import Table from "@/app/_components/ui/Tables/Table";
import { getAllOrganisations } from "@/app/_utils/api_utils/organisations";
import { Organisation } from "@prisma/client";
import { columns } from "./Columns";

const AllOrganisations = async ({ sortBy }: { sortBy?: string }) => {
  const organisations = (await getAllOrganisations(sortBy)) as Organisation[];

  return (
    <>
      <div className="overflow-x-auto">
        <Table
          data={organisations}
          columns={columns}
          rowKey={(row) => row.oid}
        />
      </div>
    </>
  );
};

export default AllOrganisations;

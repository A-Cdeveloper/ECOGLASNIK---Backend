import Table from "@/app/_components/ui/Tables/Table";

import { Organisation } from "@prisma/client";
import { columns } from "./Columns";

const AllOrganisations = async ({
  organisations,
}: {
  organisations: Organisation[];
}) => {
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

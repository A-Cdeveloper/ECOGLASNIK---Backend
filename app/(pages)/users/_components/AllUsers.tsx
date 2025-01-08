import Table from "@/app/_components/ui/Tables/Table";

import { UserRestrictedType } from "@/app/_utils/db/prismaTypes";
import { columns } from "./Columns";

const AllUsers = async ({ users }: { users: UserRestrictedType[] }) => {
  return (
    <>
      <div className="overflow-x-auto">
        <Table data={users} columns={columns} rowKey={(row) => row.uid} />
      </div>
    </>
  );
};

export default AllUsers;

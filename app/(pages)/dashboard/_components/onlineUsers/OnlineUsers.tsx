import { userStatusOptions } from "@/app/(pages)/users/_components/FilterOptions";
import Badge from "@/app/_components/ui/Buttons/Badge";
import FilterButtons from "@/app/_components/ui/Filters/FilterButtons";
import Headline from "@/app/_components/ui/Headline";
import NoResurcesFound from "@/app/_components/ui/NoResurcesFound";
import Table from "@/app/_components/ui/Tables/Table";
import { getAllUsers } from "@/app/_utils/api_utils/users";
import { UserRestrictedType } from "@/app/_utils/db/prismaTypes";
import { getColumnsUsers } from "./ColumnsUsers";

const OnlineUsers = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { role } = (await searchParams) || {};

  const { users } = (await getAllUsers("status-asc", role)) as {
    users: UserRestrictedType[];
    totalUsers: number;
  };

  const onlineUsers = users.filter((user) => user.status === 1);

  let content = (
    <Table
      data={onlineUsers}
      columns={getColumnsUsers()}
      rowKey={(row) => row.uid}
      isMiniTable
    />
  );

  if (onlineUsers.length === 0) {
    content = <NoResurcesFound>Nema prijavljenih korisnika.</NoResurcesFound>;
  }

  return (
    <>
      <div className="flex justify-between items-center border-b border-secondary-100/20  px-0 py-2">
        <Headline level={4} className="normal-case  font-thin">
          Prijavljeni korisnici <Badge>{onlineUsers.length}</Badge>
        </Headline>
        <FilterButtons
          filterList={userStatusOptions}
          queryKey="role"
          className="my-0"
        />
      </div>
      {content}
    </>
  );
};

export default OnlineUsers;

import { userStatusOptions } from "@/app/(pages)/users/_components/FilterOptions";
import NoResurcesFound from "@/app/_components/ui/NoResurcesFound";
import Table from "@/app/_components/ui/Tables/Table";
import { getAllUsers } from "@/app/_utils/api_utils/users";
import { UserRestrictedType } from "@/app/_utils/db/prismaTypes";
import TopSection from "./TopSection";
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
      <TopSection
        itemsCount={onlineUsers.length}
        filteredItems={userStatusOptions}
        queryKey="role"
      >
        Prijavljeni korisnici
      </TopSection>

      {content}
    </>
  );
};

export default OnlineUsers;

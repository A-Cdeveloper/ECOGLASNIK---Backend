import { userStatusOptions } from "@/app/(pages)/users/_components/FilterOptions";
import NoResurcesFound from "@/app/_components/ui/NoResurcesFound";
import {
  SkeletonTable,
  SkeletonTopSection,
} from "@/app/_components/ui/Skeletons";
import Table from "@/app/_components/ui/Tables/Table";
import { getAllUsers } from "@/app/_utils/api_utils/users";
import { UserRestrictedType } from "@/app/types/prismaTypes";
import { getColumnsUsers } from "./ColumnsUsers";
import TopSection from "./TopSection";

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
    content = <NoResurcesFound>Nema aktivnih korisnika.</NoResurcesFound>;
  }

  return (
    <>
      <TopSection
        itemsCount={onlineUsers.length}
        filteredItems={userStatusOptions}
        queryKey="role"
      >
        Aktivni korisnici
      </TopSection>

      {content}
    </>
  );
};

export default OnlineUsers;

export const OnlineUsersSkeleton = () => (
  <>
    <SkeletonTopSection />
    <SkeletonTable cellNumber={3} />
  </>
);

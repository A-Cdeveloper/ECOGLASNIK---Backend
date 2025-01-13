import FilterButtons from "@/app/_components/ui/Filters/FilterButtons";
import Loader from "@/app/_components/ui/Loader";
import SortSelector from "@/app/_components/ui/Sorting/SortSelector";
import TopBar, { AddNew } from "@/app/_components/ui/TopBar";
import { getAllUsers } from "@/app/_utils/api_utils/users";
import { UserRestrictedType } from "@/app/_utils/db/prismaTypes";
import { Suspense } from "react";
import Headline from "../../_components/ui/Headline";
import AllUsers from "./_components/AllUsers";
import { userStatusOptions } from "./_components/FilterOptions";
import { sortOptions } from "./_components/SortOptions";
import NoResurcesFound from "@/app/_components/ui/NoResurcesFound";
import { MAX_PAGE_SIZE } from "@/app/_utils/contants";
import Pagination from "@/app/_components/ui/Pagination/Pagination";

const UsersPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { sortBy, role, page = "1" } = await searchParams;
  const currentPage = parseInt(page, 10) || 1;

  const { users, totalUsers } = (await getAllUsers(
    sortBy,
    role,
    (currentPage - 1) * MAX_PAGE_SIZE,
    MAX_PAGE_SIZE
  )) as {
    users: UserRestrictedType[];
    totalUsers: number;
  };

  const totalPages = Math.ceil(totalUsers / MAX_PAGE_SIZE);

  let content = (
    <NoResurcesFound className="h-1/3 2xl:w-3/4">
      <Headline level={3}>Nema registrovanih korisnika.</Headline>
    </NoResurcesFound>
  );

  if (totalUsers !== 0) {
    content = (
      <>
        <Suspense fallback={<Loader />}>
          {totalPages > 1 && (
            <Pagination totalPages={totalPages} currentPage={currentPage} />
          )}
          <AllUsers users={users} />
        </Suspense>
      </>
    );
  }

  return (
    <>
      <Headline level={1}>Korisnici</Headline>
      <Suspense fallback={<Loader />}>
        <TopBar count={totalUsers}>
          <FilterButtons filterList={userStatusOptions} queryKey="role" />
          <SortSelector options={sortOptions} defaultSort="uid-asc" />
          <AddNew linkToNew="users/new">Novi superadmin</AddNew>
        </TopBar>
        {content}
      </Suspense>
    </>
  );
};

export default UsersPage;

import Table from "@/app/_components/ui/Tables/Table";

import Headline from "@/app/_components/ui/Headline";
import NoResurcesFound from "@/app/_components/ui/NoResurcesFound";
import Pagination from "@/app/_components/ui/Pagination/Pagination";
import SortSelector from "@/app/_components/ui/Sorting/SortSelector";
import TopBar, { AddNew } from "@/app/_components/ui/TopBar";
import { MAX_PAGE_SIZE } from "@/app/config";
import { getColumnsUsers } from "./ColumnsUsers";
import { sortOptions } from "./SortOptions";

import FilterButtons from "@/app/_components/ui/Filters/FilterButtons";
import {
  SkeletonPagination,
  SkeletonTable,
  SkeletonTopBar,
} from "@/app/_components/ui/Skeletons";
import { getAllUsers } from "@/app/_utils/api_utils/users";
import { UserRestrictedType } from "@/app/types/prismaTypes";
import Link from "next/link";
import { userStatusOptions } from "./FilterOptions";

const AllUsers = async ({
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

  if (totalUsers === 0) {
    return (
      <>
        <NoResurcesFound className="h-1/3 2xl:w-3/4">
          <Headline level={3}>Nema registrovanih korisnika.</Headline>
          <Link href="/users" className="button info small mt-5 inline-block">
            Resetuj filtre
          </Link>
        </NoResurcesFound>
      </>
    );
  }

  return (
    <>
      <TopBar count={totalUsers}>
        <FilterButtons filterList={userStatusOptions} queryKey="role" />
        <SortSelector options={sortOptions} defaultSort="uid-asc" />
        <AddNew linkToNew="/users/new">Dodaj superadmina</AddNew>
      </TopBar>
      <div className="overflow-x-auto">
        <Table
          data={users}
          columns={getColumnsUsers({})}
          rowKey={(row) => row.uid}
        />
      </div>
      {totalPages > 1 && (
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      )}
    </>
  );
};

export default AllUsers;

export const AllUsersSkeleton = () => (
  <>
    <SkeletonTopBar />
    <SkeletonTable />
    <SkeletonPagination />
  </>
);

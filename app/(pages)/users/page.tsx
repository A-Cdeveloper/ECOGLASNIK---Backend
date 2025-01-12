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

const UsersPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { sortBy, role } = await searchParams;
  const users = (await getAllUsers(sortBy, role)) as UserRestrictedType[];

  let content = (
    <NoResurcesFound className="h-1/3 2xl:w-3/4">
      <Headline level={3}>Nema registrovanih korisnika.</Headline>
    </NoResurcesFound>
  );

  if (users.length !== 0) {
    content = (
      <>
        <Suspense fallback={<Loader />}>
          <AllUsers users={users} />
        </Suspense>
      </>
    );
  }

  return (
    <>
      <Headline level={1}>Korisnici</Headline>
      <Suspense fallback={<Loader />}>
        <TopBar count={users.length}>
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

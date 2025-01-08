import Loader from "@/app/_components/ui/Loader";
import PageTopbar from "@/app/_components/ui/PageTopbar";
import { getAllUsers } from "@/app/_utils/api_utils/users";
import { UserRestrictedType } from "@/app/_utils/db/prismaTypes";
import { Suspense } from "react";
import Headline from "../../_components/ui/Headline";
import AllUsers from "./_components/AllUsers";
import { sortOptions } from "./_components/SortOptions";

const UsersPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { sortBy } = await searchParams;
  const users = (await getAllUsers(sortBy)) as UserRestrictedType[];

  let content = <Headline level={2}>Nema registrovanih korisnika.</Headline>;

  if (users.length !== 0) {
    content = (
      <Suspense fallback={<Loader />}>
        <PageTopbar
          sortOptions={sortOptions}
          defaultSort="uid-asc"
          linkToNew="users/new"
        >
          Novi superadmin
        </PageTopbar>
        <AllUsers users={users} />
      </Suspense>
    );
  }

  return (
    <>
      <Headline level={1}>Korisnici</Headline>
      {content}
    </>
  );
};

export default UsersPage;

import { Suspense } from "react";
import Headline from "../../_components/ui/Headline";
import AllUsers, { AllUsersSkeleton } from "./_components/AllUsers";

const UsersPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  return (
    <>
      <Headline level={1}>Korisnici</Headline>
      <Suspense fallback={<AllUsersSkeleton />}>
        <AllUsers searchParams={searchParams} />
      </Suspense>
    </>
  );
};

export default UsersPage;

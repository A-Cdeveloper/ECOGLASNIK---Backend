//import Loader from "@/app/_components/ui/Loader";
import { Suspense } from "react";
import Headline from "../../_components/ui/Headline";

import AllOrganisations, {
  AllOrganisationsSkeleton,
} from "./_components/AllOrganisations";
import { authSecurityPatch } from "@/app/_utils/auth/authSecurityPatch";

const OrganisationsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  await authSecurityPatch();
  return (
    <>
      <Headline level={1}>Nadležne službe</Headline>

      <Suspense fallback={<AllOrganisationsSkeleton />}>
        <AllOrganisations searchParams={searchParams} />
      </Suspense>
    </>
  );
};

export default OrganisationsPage;

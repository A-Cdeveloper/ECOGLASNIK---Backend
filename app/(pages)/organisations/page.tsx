//import Loader from "@/app/_components/ui/Loader";
import { Suspense } from "react";
import Headline from "../../_components/ui/Headline";

import AllOrganisations, {
  AllOrganisationsSkeleton,
} from "./_components/AllOrganisations";

const OrganisationsPage = ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
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

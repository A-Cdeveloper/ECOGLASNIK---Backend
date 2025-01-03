import Loader from "@/app/_components/ui/Loader";
import Headline from "../../_components/ui/Headline";
import AllOrganisations from "./_components/AllOrganisations";
import HeadOrganisaitons from "./_components/HeadOrganisaitons";
import { Suspense } from "react";

const OrganisationsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { sortBy } = await searchParams;
  return (
    <>
      <Headline level={1}>Nadležne službe</Headline>
      <Suspense fallback={<Loader />}>
        <HeadOrganisaitons />
        <AllOrganisations sortBy={sortBy} />
      </Suspense>
    </>
  );
};

export default OrganisationsPage;

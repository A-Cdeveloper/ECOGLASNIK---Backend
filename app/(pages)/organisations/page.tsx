import Loader from "@/app/_components/ui/Loader";
import Headline from "../../_components/ui/Headline";
import AllOrganisations from "./_components/AllOrganisations";
import HeadOrganisaitons from "./_components/HeadOrganisaitons";
import { Suspense } from "react";
import { getAllOrganisations } from "@/app/_utils/api_utils/organisations";
import { Organisation } from "@prisma/client";
import Link from "next/link";

const OrganisationsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { sortBy } = await searchParams;
  const organisations = (await getAllOrganisations(sortBy)) as Organisation[];

  if (organisations.length === 0) {
    return (
      <>
        <Headline level={1}>Nadležne službe</Headline>
        <Link
          href="/organisations/new"
          className="button info small mt-5 inline-block"
        >
          Dodaj novu službu
        </Link>
      </>
    );
  }

  return (
    <>
      <Headline level={1}>Nadležne službe</Headline>
      <Suspense fallback={<Loader />}>
        <HeadOrganisaitons />
        <AllOrganisations organisations={organisations} />
      </Suspense>
    </>
  );
};

export default OrganisationsPage;

import Loader from "@/app/_components/ui/Loader";
import PageTopbar from "@/app/_components/ui/PageTopbar";
import { getAllOrganisations } from "@/app/_utils/api_utils/organisations";
import { Organisation } from "@prisma/client";
import Link from "next/link";
import { Suspense } from "react";
import Headline from "../../_components/ui/Headline";
import AllOrganisations from "./_components/AllOrganisations";

import { sortOptions } from "./_components/SortOptions";

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
        <PageTopbar
          sortOptions={sortOptions}
          linkToNew="/organisations/new"
          defaultSort="oid-asc"
        >
          Nova služba
        </PageTopbar>
        <AllOrganisations organisations={organisations} />
      </Suspense>
    </>
  );
};

export default OrganisationsPage;

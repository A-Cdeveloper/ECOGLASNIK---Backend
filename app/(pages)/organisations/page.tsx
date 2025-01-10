import Loader from "@/app/_components/ui/Loader";
import { getAllOrganisations } from "@/app/_utils/api_utils/organisations";
import { Organisation } from "@prisma/client";
import Link from "next/link";
import { Suspense } from "react";
import Headline from "../../_components/ui/Headline";
import AllOrganisations from "./_components/AllOrganisations";

import SortSelector from "@/app/_components/ui/Sorting/SortSelector";
import TopBar, { AddNew } from "@/app/_components/ui/TopBar";
import { sortOptions } from "./_components/SortOptions";
import NoResurcesFound from "@/app/_components/ui/NoResurcesFound";

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
        <NoResurcesFound>
          <>
            <Headline level={3}> Nema registrovanih službi.</Headline>
            <Link
              href="/organisations/new"
              className="button info small mt-5 inline-block"
            >
              Dodaj novu službu
            </Link>
          </>
        </NoResurcesFound>
      </>
    );
  }

  return (
    <>
      <Headline level={1}>Nadležne službe</Headline>
      <Suspense fallback={<Loader />}>
        <TopBar count={organisations.length}>
          <SortSelector options={sortOptions} defaultSort="oid-asc" />
          <AddNew linkToNew="/organisations/new">Nova služba</AddNew>
        </TopBar>

        <AllOrganisations organisations={organisations} />
      </Suspense>
    </>
  );
};

export default OrganisationsPage;

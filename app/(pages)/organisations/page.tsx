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
import { MAX_PAGE_SIZE } from "@/app/_utils/contants";
import Pagination from "@/app/_components/ui/Pagination/Pagination";

const OrganisationsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { sortBy, page = "1" } = await searchParams;
  const currentPage = parseInt(page, 10) || 1;

  const { organisations, totalOrganisations } = (await getAllOrganisations(
    sortBy,
    (currentPage - 1) * MAX_PAGE_SIZE,
    MAX_PAGE_SIZE
  )) as {
    organisations: Organisation[];
    totalOrganisations: number;
  };

  const totalPages = Math.ceil(totalOrganisations / MAX_PAGE_SIZE);

  //console.log("organisations", organisations);
  console.log("totalOrganisations", totalOrganisations);

  if (totalOrganisations === 0) {
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
        <TopBar count={totalOrganisations}>
          <SortSelector options={sortOptions} defaultSort="oid-asc" />
          <AddNew linkToNew="/organisations/new">Nova služba</AddNew>
        </TopBar>
        {totalPages > 1 && (
          <Pagination totalPages={totalPages} currentPage={currentPage} />
        )}
        <AllOrganisations organisations={organisations} />
      </Suspense>
    </>
  );
};

export default OrganisationsPage;

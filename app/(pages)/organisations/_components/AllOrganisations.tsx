import Table from "@/app/_components/ui/Tables/Table";

import Headline from "@/app/_components/ui/Headline";
import NoResurcesFound from "@/app/_components/ui/NoResurcesFound";
import Pagination from "@/app/_components/ui/Pagination/Pagination";
import SortSelector from "@/app/_components/ui/Sorting/SortSelector";
import TopBar, { AddNew } from "@/app/_components/ui/TopBar";
import { getAllOrganisations } from "@/app/_utils/api_utils/organisations";
import { MAX_PAGE_SIZE } from "@/app/_utils/contants";
import { Organisation } from "@prisma/client";
import Link from "next/link";
import { columns } from "./Columns";
import { sortOptions } from "./SortOptions";

import {
  SkeletonPagination,
  SkeletonTable,
  SkeletonTopBar,
} from "@/app/_components/ui/Skeletons";

const AllOrganisations = async ({
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
      <TopBar count={totalOrganisations}>
        <SortSelector options={sortOptions} defaultSort="oid-asc" />
        <AddNew linkToNew="/organisations/new">Nova služba</AddNew>
      </TopBar>
      <div className="overflow-x-auto">
        <Table
          data={organisations}
          columns={columns}
          rowKey={(row) => row.oid}
        />
      </div>
      {totalPages > 1 && (
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      )}
    </>
  );
};

export default AllOrganisations;

export const AllOrganisationsSkeleton = () => (
  <>
    <SkeletonTopBar />
    <SkeletonTable />
    <SkeletonPagination />
  </>
);

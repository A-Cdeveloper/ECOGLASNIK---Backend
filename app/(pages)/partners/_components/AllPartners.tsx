import Table from "@/app/_components/ui/Tables/Table";

import Headline from "@/app/_components/ui/Headline";
import NoResurcesFound from "@/app/_components/ui/NoResurcesFound";
import Pagination from "@/app/_components/ui/Pagination/Pagination";

import TopBar, { AddNew } from "@/app/_components/ui/TopBar";
import { MAX_PAGE_SIZE } from "@/app/_utils/contants";
import { Partners } from "@prisma/client";
import Link from "next/link";
import { getColumnsPartners } from "./ColumnsPartners";

import {
  SkeletonPagination,
  SkeletonTable,
  SkeletonTopBar,
} from "@/app/_components/ui/Skeletons";
import { getAllPartners } from "@/app/_utils/api_utils/partners";

const AllPartners = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { sortBy, page = "1" } = await searchParams;
  const currentPage = parseInt(page, 10) || 1;
  const { partners, totalPartners } = (await getAllPartners(
    sortBy,
    (currentPage - 1) * MAX_PAGE_SIZE,
    MAX_PAGE_SIZE
  )) as {
    partners: Partners[];
    totalPartners: number;
  };

  const totalPages = Math.ceil(totalPartners / MAX_PAGE_SIZE);

  if (totalPartners === 0) {
    return (
      <>
        <NoResurcesFound>
          <>
            <Headline level={3}> Nema partnera.</Headline>
            <Link
              href="/partners/new"
              className="button info small mt-5 inline-block"
            >
              Dodaj novog partnera
            </Link>
          </>
        </NoResurcesFound>
      </>
    );
  }

  return (
    <div className="w-full lg:w-3/4">
      <TopBar count={totalPartners}>
        <AddNew linkToNew="/partners/new">Novi partner</AddNew>
      </TopBar>
      <div className="overflow-x-auto">
        <Table
          data={partners}
          columns={getColumnsPartners({})}
          rowKey={(row) => row.pid}
        />
      </div>
      {totalPages > 1 && (
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      )}
    </div>
  );
};

export default AllPartners;

export const AllPartnersSkeleton = () => (
  <>
    <SkeletonTopBar />
    <SkeletonTable />
    <SkeletonPagination />
  </>
);

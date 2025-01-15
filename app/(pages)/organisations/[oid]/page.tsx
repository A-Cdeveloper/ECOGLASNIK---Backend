/* eslint-disable @typescript-eslint/no-explicit-any */
import BackButton from "@/app/_components/ui/Buttons/BackButton";
import Headline from "@/app/_components/ui/Headline";
import Table from "@/app/_components/ui/Tables/Table";

import { getOrganisation } from "@/app/_utils/api_utils/organisations";
import React from "react";
import { getColumnsCategories } from "../../categories/_components/ColumnsCategories";
import { calculatePercentage } from "@/app/_utils/helpers";
import ItemOperationsButtons from "@/app/_components/ui/Elements/ItemOperationsButtons";
import { deleteOrganisationByIdAction } from "../_actions";

const OrganisationPage = async ({
  params,
}: {
  params: Promise<{ oid: string }>;
}) => {
  const { oid } = await params;
  const organisation = await getOrganisation(oid);

  const totalProblems = organisation?.categories?.reduce(
    (total, category) =>
      total +
      category.problems.filter((problem) => problem.status !== "archive")
        .length,
    0
  );

  const totalActiveProblems = organisation?.categories?.reduce(
    (total, category) =>
      total +
      category.problems.filter((problem) => problem.status === "active").length,
    0
  );

  const totalDoneProblems = organisation?.categories?.reduce(
    (total, category) =>
      total +
      category.problems.filter((problem) => problem.status === "done").length,
    0
  );

  const totalArchiveProblems = organisation?.categories?.reduce(
    (total, category) =>
      total +
      category.problems.filter((problem) => problem.status === "archive")
        .length,
    0
  );

  return (
    <>
      <BackButton to="/organisations" />
      <Headline level={1}>{organisation?.organisation_name}</Headline>

      <div className="grid grid-cols-[150px_1fr] mt-4 bg-secondary-100/10 self-start max-w-[375px] px-3 py-2 gap-y-1 text-[13px]">
        <p className="font-semibold">Adresa:</p>
        <p>{organisation?.organisation_address}</p>
        <p className="font-semibold">Telefon:</p>
        <p>{organisation?.organisation_phone}</p>
        <p className="font-semibold">Email:</p>
        <p>{organisation?.organisation_email}</p>
      </div>

      <div className="grid grid-cols-[1fr_1fr_1fr_1fr] mt-6 gap-y-3 w-full 2xl:w-[50%] gap-x-4 items-center uppercase ">
        <div className="border-b-2 border-skyblue-100 text-center flex items-end  gap-x-2 text-skyblue-100 font-semibold ">
          <span className="block text-3xl">{totalProblems}</span>
          <p className="text-[17px] mb-[6px]">Prijava</p>
        </div>
        <div className="border-b-2 border-danger-100 text-center flex items-end  gap-x-2 text-danger-100 font-semibold ">
          <span className="block text-3xl">{totalActiveProblems}</span>
          <p className="text-[17px] mb-[6px]">Aktivno</p>
        </div>
        <div className="border-b-2 border-turquoise-100 text-center flex items-end  gap-x-2 text-turquoise-100 font-semibold ">
          <span className="block text-3xl text-turquoise-100">
            {totalDoneProblems}
          </span>
          <p className="text-[17px] mb-[6px]">
            Rešeno (
            {totalDoneProblems &&
              totalProblems &&
              calculatePercentage(totalDoneProblems, totalProblems)}
            %)
          </p>
        </div>
        <div className="border-b-2 border-secondary-100/50 text-center flex items-end  gap-x-2 text-secondary-100/50 font-semibold ">
          <span className="block text-3xl">{totalArchiveProblems}</span>
          <p className="text-[17px] mb-[6px]">Arhiva</p>
        </div>
      </div>

      <div className="my-4">
        <Table
          data={organisation?.categories || []}
          columns={getColumnsCategories({
            id: false,
            operations: false,
            organisations: false,
          })}
          rowKey={(row) => row.cat_id}
        />
      </div>
      <div className="my-8 w-full 2xl:w-3/4">
        <ItemOperationsButtons
          id={organisation?.oid as number}
          basePath="organisations"
          deleteAction={deleteOrganisationByIdAction}
        />
      </div>
    </>
  );
};

export default OrganisationPage;

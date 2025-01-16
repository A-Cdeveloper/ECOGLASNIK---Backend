/* eslint-disable @typescript-eslint/no-explicit-any */
import BackButton from "@/app/_components/ui/Buttons/BackButton";
import Headline from "@/app/_components/ui/Headline";
import Table from "@/app/_components/ui/Tables/Table";

import ItemOperationsButtons from "@/app/_components/dataOperations/ItemOperationsButtons";
import Stats from "@/app/_components/dataOperations/stats/Stats";
import { getOrganisation } from "@/app/_utils/api_utils/organisations";
import { Problem } from "@prisma/client";
import { getColumnsCategories } from "../../categories/_components/ColumnsCategories";
import { deleteOrganisationByIdAction } from "../_actions";

const OrganisationPage = async ({
  params,
}: {
  params: Promise<{ oid: string }>;
}) => {
  const { oid } = await params;
  const organisation = await getOrganisation(oid);

  const allProblems = organisation?.categories.flatMap(
    (category) => category.problems
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

      <Stats items={allProblems as Problem[]} />

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

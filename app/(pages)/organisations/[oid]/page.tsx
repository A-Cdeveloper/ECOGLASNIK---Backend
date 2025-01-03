/* eslint-disable @typescript-eslint/no-explicit-any */
import BackButton from "@/app/_components/ui/Buttons/BackButton";
import Headline from "@/app/_components/ui/Headline";

import { getOrganisation } from "@/app/_utils/api_utils/organisations";
import React from "react";

const OrganisationPage = async ({
  params,
}: {
  params: Promise<{ oid: string }>;
}) => {
  const { oid } = await params;
  const organisation = await getOrganisation(oid);

  return (
    <>
      <BackButton />
      <Headline level={1}>{organisation?.organisation_name}</Headline>
    </>
  );
};

export default OrganisationPage;

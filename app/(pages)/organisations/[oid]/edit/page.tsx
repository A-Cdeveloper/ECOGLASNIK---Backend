import BackButton from "@/app/_components/ui/Buttons/BackButton";
import Headline from "@/app/_components/ui/Headline";
import { getAllCategories } from "@/app/_utils/api_utils/categories";
import { getOrganisation } from "@/app/_utils/api_utils/organisations";
import React from "react";
import OrganisationForm from "../../_components/OrganisationForm";
import { OrganisationType } from "@/app/types/prismaTypes";
import { authSecurityPatch } from "@/app/_utils/auth/authSecurityPatch";

const EditOrganisation = async ({
  params,
}: {
  params: Promise<{ oid: string }>;
}) => {
  await authSecurityPatch();
  const { categories: categoriesApi } = (await getAllCategories()) as {
    categories: { cat_id: number; cat_name: string }[];
  };
  const organisation = await getOrganisation((await params).oid);

  const categoriesSelection = categoriesApi?.map((cat) => {
    return {
      id: cat.cat_id,
      label: cat.cat_name,
    };
  });

  return (
    <div>
      <BackButton />
      <Headline level={1}>Izmeni službu</Headline>
      <OrganisationForm
        categoriesSelection={categoriesSelection || []}
        organisation={organisation as OrganisationType}
      />
    </div>
  );
};

export default EditOrganisation;

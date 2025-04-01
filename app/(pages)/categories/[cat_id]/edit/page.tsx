import BackButton from "@/app/_components/ui/Buttons/BackButton";
import Headline from "@/app/_components/ui/Headline";
import { getCategoryById } from "@/app/_utils/api_utils/categories";
import { getAllOrganisations } from "@/app/_utils/api_utils/organisations";
import CategoryForm from "../../_components/CategoryForm";
import { ProblemCategoriesType } from "@/app/types/prismaTypes";
import { Organisation } from "@prisma/client";
import { authSecurityPatch } from "@/app/_utils/auth/authSecurityPatch";

const EditCategory = async ({
  params,
}: {
  params: Promise<{ cat_id: string }>;
}) => {
  const { organisations: organisationsApi } = (await getAllOrganisations()) as {
    organisations: Organisation[];
  };
  await authSecurityPatch();

  const category = await getCategoryById(+(await params).cat_id);

  const organisationsSelection = organisationsApi?.map((org) => {
    return {
      id: org.oid,
      label: org.organisation_name,
    };
  });
  return (
    <div>
      <BackButton />
      <Headline level={1}>Izmeni kategoriju</Headline>
      <CategoryForm
        organisationsSelection={organisationsSelection || []}
        category={category as ProblemCategoriesType}
      />
    </div>
  );
};

export default EditCategory;

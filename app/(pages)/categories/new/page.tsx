import BackButton from "@/app/_components/ui/Buttons/BackButton";
import Headline from "@/app/_components/ui/Headline";
import { getAllOrganisations } from "@/app/_utils/api_utils/organisations";
import CategoryForm from "../_components/CategoryForm";
import { Organisation } from "@prisma/client";
import { authSecurityPatch } from "@/app/_utils/auth/authSecurityPatch";

const AddCategory = async () => {
  const { organisations: organisationsApi } = (await getAllOrganisations()) as {
    organisations: Organisation[];
  };

  await authSecurityPatch();

  const organisationsSelection = organisationsApi?.map((org) => {
    return {
      id: org.oid,
      label: org.organisation_name,
    };
  });

  return (
    <div>
      <BackButton />
      <Headline level={1}>Dodaj novu kategoriju</Headline>
      <CategoryForm organisationsSelection={organisationsSelection || []} />
    </div>
  );
};

export default AddCategory;

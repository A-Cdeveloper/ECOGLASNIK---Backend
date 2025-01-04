import BackButton from "@/app/_components/ui/Buttons/BackButton";
import Headline from "@/app/_components/ui/Headline";
import { getAllOrganisations } from "@/app/_utils/api_utils/organisations";
import CategoryForm from "../_components/CategoryForm";

const AddCategory = async () => {
  const organisationsApi = await getAllOrganisations();

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

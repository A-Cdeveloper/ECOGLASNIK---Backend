import BackButton from "@/app/_components/ui/Buttons/BackButton";
import Headline from "@/app/_components/ui/Headline";
import { getAllCategories } from "@/app/_utils/api_utils/categories";
import OrganisationForm from "../_components/OrganisationForm";

//import CategoryForm from "../_components/CategoryForm";

const AddOrganisation = async () => {
  const categoriesApi = await getAllCategories();

  const categoriesSelection = categoriesApi?.map((cat) => {
    return {
      id: cat.cat_id,
      label: cat.cat_name,
    };
  });

  return (
    <div>
      <BackButton />
      <Headline level={1}>Dodaj novu službu</Headline>
      <OrganisationForm categoriesSelection={categoriesSelection || []} />
    </div>
  );
};

export default AddOrganisation;

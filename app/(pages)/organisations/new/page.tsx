import BackButton from "@/app/_components/ui/Buttons/BackButton";
import Headline from "@/app/_components/ui/Headline";
import { getAllCategories } from "@/app/_utils/api_utils/categories";
import OrganisationForm from "../_components/OrganisationForm";
import { authSecurityPatch } from "@/app/_utils/auth/authSecurityPatch";

const AddOrganisation = async () => {
  await authSecurityPatch();
  const { categories: categoriesApi } = (await getAllCategories()) as {
    categories: { cat_id: number; cat_name: string }[];
  };

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

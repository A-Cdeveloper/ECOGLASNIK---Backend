import BackButton from "@/app/_components/ui/Buttons/BackButton";
import Button from "@/app/_components/ui/Buttons/Button";
import CheckboxGroup from "@/app/_components/ui/Form/CheckboxGroup";
import Input from "@/app/_components/ui/Form/Input";
import Headline from "@/app/_components/ui/Headline";
import { getAllOrganisations } from "@/app/_utils/api_utils/organisations";

const AddCategory = async () => {
  async function createInvoice(formData: FormData) {
    "use server";

    const rawFormData = {
      Kategorija: formData.get("cat_name"),
      Sluzbe: formData.getAll("organisations"),
    };

    console.log(rawFormData);

    // mutate data
    // revalidate cache
  }

  const organisationsApi = await getAllOrganisations();

  const organisations = organisationsApi?.map((org) => {
    return {
      id: org.oid,
      label: org.organisation_name,
    };
  });

  console.log(organisations);

  return (
    <div>
      <BackButton />
      <Headline level={1}>Dodaj novu kategoriju</Headline>
      <form action={createInvoice} className="mt-4 w-1/3">
        <Input
          type="text"
          name="cat_name"
          placeholder="Naziv Kategorije"
          required
        />
        <CheckboxGroup
          organisations={organisations || []}
          name="organisations"
          className="my-4 space-y-2"
        />

        <Button type="submit" variation="info">
          Dodaj
        </Button>
      </form>
    </div>
  );
};

export default AddCategory;

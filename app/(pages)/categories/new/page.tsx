import BackButton from "@/app/_components/ui/Buttons/BackButton";
import Button from "@/app/_components/ui/Buttons/Button";
import Input from "@/app/_components/ui/Form/Input";
import Headline from "@/app/_components/ui/Headline";

const AddCategory = () => {
  async function createInvoice(formData: FormData) {
    "use server";

    const rawFormData = {
      Kategorija: formData.get("cat_name"),
      Sluzbe: formData.get("options"),
    };

    console.log(rawFormData);

    // mutate data
    // revalidate cache
  }

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

        <Button type="submit" variation="info">
          Dodaj
        </Button>
      </form>
    </div>
  );
};

export default AddCategory;

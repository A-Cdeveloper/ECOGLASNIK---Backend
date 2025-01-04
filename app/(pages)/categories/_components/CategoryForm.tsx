"use client";
import { addNewCategoryAction } from "../_actions";
import Input from "@/app/_components/ui/Form/Input";
import CheckboxGroup from "@/app/_components/ui/Form/CheckboxGroup";
import { SubmitButton } from "@/app/_components/ui/Buttons/SubmitButton";
import { useActionState } from "react";
import ErrorsForm from "./ErrorsForm";
import Link from "next/link";

const CategoryForm = ({
  organisationsSelection,
}: {
  organisationsSelection: { id: number; label: string }[];
}) => {
  const [errors, formAction] = useActionState(addNewCategoryAction, []);

  const isOrganisationExist = organisationsSelection.length > 0;

  return (
    <form action={formAction} className="mt-4 w-1/3 space-y-2">
      <Input
        type="text"
        name="cat_name"
        placeholder="Naziv Kategorije problema"
      />
      {isOrganisationExist ? (
        <CheckboxGroup
          organisations={organisationsSelection}
          name="organisations"
          className="py-4 space-y-3"
        />
      ) : (
        <div>
          <p>Nema nijedne nadležne službe.</p>
          <Link
            href="/organisations/new"
            className="button info small mt-5 inline-block"
          >
            Dodaj novu službu
          </Link>
        </div>
      )}

      {errors.length > 0 && <ErrorsForm errors={errors} />}
      {isOrganisationExist && <SubmitButton>Dodaj</SubmitButton>}
    </form>
  );
};

export default CategoryForm;

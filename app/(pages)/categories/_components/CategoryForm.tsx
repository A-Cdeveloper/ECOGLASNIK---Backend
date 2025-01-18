"use client";
import { addNewCategoryAction, updateCategoryAction } from "../_actions";
import Input from "@/app/_components/ui/Form/Input";
import CheckboxGroup from "@/app/_components/ui/Form/CheckboxGroup";
import { SubmitButton } from "@/app/_components/ui/Buttons/SubmitButton";
import { useActionState } from "react";
import ErrorsForm from "../../../_components/ui/Form/ErrorsFormMessage";
import Link from "next/link";

import { ProblemCategoriesType } from "@/app/_utils/db/prismaTypes";

const CategoryForm = ({
  organisationsSelection,
  category,
}: {
  organisationsSelection: { id: number; label: string }[];
  category?: ProblemCategoriesType;
}) => {
  ////////////
  const action = category ? updateCategoryAction : addNewCategoryAction;

  const [errors, formAction] = useActionState(action, []);

  const isOrganisationExist = organisationsSelection.length > 0;

  return (
    <form
      action={formAction}
      className="mt-4 w-full md:w-1/2 2xl:w-1/3 space-y-2"
    >
      {category && (
        <input type="hidden" name="cat_id" value={category.cat_id} />
      )}
      <Input
        type="text"
        name="cat_name"
        placeholder="Naziv Kategorije problema"
        defaultValue={category?.cat_name}
      />
      {isOrganisationExist ? (
        <div className="py-4">
          <p className="text-winter-100/50 text-[13px]">
            Izaberite nadležnu službu/e:
          </p>
          <CheckboxGroup
            organisations={organisationsSelection}
            name="organisations"
            className="space-y-3 py-2"
            defaultSelected={
              category?.organisations.map((org) => org.oid) as number[]
            }
          />
        </div>
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
      {isOrganisationExist && (
        <SubmitButton>{category ? "Izmeni" : "Dodaj"}</SubmitButton>
      )}
    </form>
  );
};

export default CategoryForm;

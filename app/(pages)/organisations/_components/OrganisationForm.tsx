"use client";
// import { addNewCategoryAction, updateCategoryAction } from "../_actions";
import { SubmitButton } from "@/app/_components/ui/Buttons/SubmitButton";
import CheckboxGroup from "@/app/_components/ui/Form/CheckboxGroup";
import Input from "@/app/_components/ui/Form/Input";
import { useActionState } from "react";
// import ErrorsForm from "./ErrorsForm";
import Link from "next/link";

import { OrganisationType } from "@/app/types/prismaTypes";
import ErrorsFormMessage from "../../../_components/ui/Form/ErrorsFormMessage";
import {
  addNewOrganisationAction,
  updateOrganisationAction,
} from "../_actions";

const OrganisationForm = ({
  categoriesSelection = [],
  organisation,
}: {
  categoriesSelection: { id: number; label: string }[];
  organisation?: OrganisationType;
}) => {
  ////////////
  const action = organisation
    ? updateOrganisationAction
    : addNewOrganisationAction;

  const [response, formAction] = useActionState(action, {
    success: false,
    message: [],
  });

  const isCategoriesExist = categoriesSelection.length > 0;

  return (
    <form
      action={formAction}
      className="mt-4 w-full md:w-2/3 2xl:w-1/3 space-y-2"
    >
      {organisation && (
        <input type="hidden" name="oid" value={organisation.oid} />
      )}
      <Input
        type="text"
        name="organisation_name"
        placeholder="Naziv Službe"
        defaultValue={organisation?.organisation_name}
      />
      <Input
        type="text"
        name="organisation_address"
        placeholder="Adresa"
        defaultValue={organisation?.organisation_address}
      />
      <Input
        type="email"
        name="organisation_email"
        placeholder="E-mail adresa"
        defaultValue={organisation?.organisation_email}
      />

      <Input
        type="tel"
        name="organisation_phone"
        placeholder="Telefon"
        defaultValue={organisation?.organisation_phone}
      />
      {isCategoriesExist ? (
        <div className="pt-4">
          <p className="text-winter-100/50 text-[13px]">
            Izaberite kategoriju problema:
          </p>
          <CheckboxGroup
            organisations={categoriesSelection}
            name="categories"
            className="pt-4 grid grid-cols-1 lg:grid-cols-2 grid-rows-2"
            defaultSelected={organisation?.categories.map((cat) => cat.cat_id)}
          />
        </div>
      ) : (
        <div>
          <p>Nema nijedne kategorije.</p>
          <Link
            href="/categories/new"
            className="button info small mt-5 inline-block"
          >
            Dodaj novu kategoriju
          </Link>
        </div>
      )}

      {response?.message && <ErrorsFormMessage errors={response?.message} />}
      {isCategoriesExist && (
        <SubmitButton>{organisation ? "Izmeni" : "Dodaj"}</SubmitButton>
      )}
    </form>
  );
};

export default OrganisationForm;

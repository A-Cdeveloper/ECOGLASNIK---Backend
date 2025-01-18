"use client";

import { SubmitButton } from "@/app/_components/ui/Buttons/SubmitButton";
import Input from "@/app/_components/ui/Form/Input";
import { useActionState } from "react";

import { UserRestrictedType } from "@/app/_utils/db/prismaTypes";

import ToggleSwitch from "@/app/_components/ui/Form/ToggleSwitch";
import ErrorsForm from "../../../_components/ui/Form/ErrorsForm";
import { addNewUserAction, updateUserAction } from "../_actions";
import Select from "@/app/_components/ui/Form/Select";

const ProfileForm = ({ user }: { user?: UserRestrictedType }) => {
  ////////////
  // const action = user ? updateUserAction : addNewUserAction;

  // const [errors, formAction] = useActionState(action, []);

  return (
    <form action={() => {}} className="mt-4 w-full flex flex-col space-y-3">
      {/* {user && <input type="hidden" name="uid" value={user.uid} />} */}
      <Input
        type="text"
        name="firstname"
        placeholder="Ime"
        defaultValue={user?.firstname}
      />
      <Input
        type="text"
        name="lastname"
        placeholder="Prezime"
        defaultValue={user?.lastname}
      />

      <Input
        type="email"
        name="email"
        placeholder="E-mail adresa"
        defaultValue={user?.email}
        readOnly={!!user?.email}
      />

      <Input
        type="tel"
        name="phone"
        placeholder="Telefon"
        defaultValue={user?.phone}
      />

      <div>
        {/* {errors.length > 0 && <ErrorsForm errors={errors} />} */}
        <div className="text-end">
          <SubmitButton>Izmeni podatke</SubmitButton>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;

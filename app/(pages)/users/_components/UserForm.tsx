"use client";

import { SubmitButton } from "@/app/_components/ui/Buttons/SubmitButton";
import Input from "@/app/_components/ui/Form/Input";
import { useActionState } from "react";

import { UserRestrictedType } from "@/app/_utils/db/prismaTypes";

import ToggleSwitch from "@/app/_components/ui/Form/ToggleSwitch";
import ErrorsForm from "../../../_components/ui/Form/ErrorsFormMessage";
import { addNewUserAction, updateUserAction } from "../_actions";
import Select from "@/app/_components/ui/Form/Select";

const UserForm = ({ user }: { user?: UserRestrictedType }) => {
  ////////////
  const action = user ? updateUserAction : addNewUserAction;

  const [errors, formAction] = useActionState(action, []);

  return (
    <form
      action={formAction}
      className="mt-4 w-full md:w-2/3 2xl:w-1/3  grid lg:grid-cols-2 gap-2"
    >
      {user && <input type="hidden" name="uid" value={user.uid} />}
      <Input
        type="text"
        name="firstname"
        placeholder="Ime"
        defaultValue={user?.firstname}
        className="col-span-2 lg:col-span-1"
      />
      <Input
        type="text"
        name="lastname"
        placeholder="Prezime"
        defaultValue={user?.lastname}
        className="col-span-2 lg:col-span-1"
      />

      <Input
        type="email"
        name="email"
        placeholder="E-mail adresa"
        defaultValue={user?.email}
        readOnly={!!user?.email}
        className={`${!!user?.email && "disabled"} col-span-2 `}
      />

      <Input
        type="tel"
        name="phone"
        placeholder="Telefon"
        defaultValue={user?.phone}
        className="col-span-2"
      />
      {user && (
        <Select
          name="role"
          options={[
            { value: "user", label: "user" },
            { value: "superadmin", label: "superadmin" },
          ]}
          defaultValue={user?.role || "user"}
        />
      )}

      <ToggleSwitch
        name="isVerified"
        initialEnabled={!!user?.isVerified}
        className="col-span-2"
      />

      <div>
        {errors.length > 0 && <ErrorsForm errors={errors} />}

        <SubmitButton>{user ? "Izmeni" : "Dodaj"}</SubmitButton>
      </div>
    </form>
  );
};

export default UserForm;

"use client";

import { SubmitButton } from "@/app/_components/ui/Buttons/SubmitButton";
import Input from "@/app/_components/ui/Form/Input";

import ErrorsFormMessage from "@/app/_components/ui/Form/ErrorsFormMessage";
import { UserRestrictedType } from "@/app/_utils/db/prismaTypes";
import { useActionState } from "react";
import { updateProfileAction } from "../_actions";
import SuccessFormMessage from "@/app/_components/ui/Form/SuccessFormMessage";

const ProfileForm = ({ user }: { user?: UserRestrictedType }) => {
  ////////////

  const [response, formAction] = useActionState(updateProfileAction, {
    success: false,
    message: [],
  });

  return (
    <form action={formAction} className="mt-4 w-full flex flex-col space-y-3">
      {user && (
        <>
          <input type="hidden" name="uid" value={user.uid} />
        </>
      )}
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
      />

      <Input
        type="tel"
        name="phone"
        placeholder="Telefon"
        defaultValue={user?.phone}
      />

      {!response.success ? (
        <ErrorsFormMessage errors={response.message} />
      ) : (
        <SuccessFormMessage message={response.message} />
      )}
      <div className="text-end">
        <SubmitButton>Izmeni podatke</SubmitButton>
      </div>
    </form>
  );
};

export default ProfileForm;

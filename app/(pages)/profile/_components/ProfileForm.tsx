"use client";

import { SubmitButton } from "@/app/_components/ui/Buttons/SubmitButton";
import Input from "@/app/_components/ui/Form/Input";
import ErrorsFormMessage from "@/app/_components/ui/Form/ErrorsFormMessage";
import SuccessFormMessage from "@/app/_components/ui/Form/SuccessFormMessage";
import { useActionState, useEffect } from "react";
import { updateProfileAction } from "../_actions";
import { UserRestrictedType } from "@/app/_utils/db/prismaTypes";

const ProfileForm = ({
  user,
  refreshUser,
}: {
  user: UserRestrictedType;
  refreshUser: () => void;
}) => {
  const [response, formAction] = useActionState(updateProfileAction, {
    success: false,
    message: [],
  });

  useEffect(() => {
    if (response.success) {
      refreshUser();
    }
  }, [refreshUser, response]);

  return (
    <form action={formAction} className="mt-4 w-full flex flex-col space-y-3">
      {/* Hidden input for user ID */}
      {user && <input type="hidden" name="uid" value={user.uid} />}

      {/* Input fields for user details */}
      <Input
        type="text"
        name="firstname"
        placeholder="Ime"
        defaultValue={user?.firstname || ""}
      />
      <Input
        type="text"
        name="lastname"
        placeholder="Prezime"
        defaultValue={user?.lastname || ""}
      />
      <Input
        type="email"
        name="email"
        placeholder="E-mail adresa"
        defaultValue={user?.email || ""}
      />
      <Input
        type="tel"
        name="phone"
        placeholder="Telefon"
        defaultValue={user?.phone || ""}
      />

      {/* Success and error messages */}
      {response.message.length > 0 &&
        (response.success ? (
          <SuccessFormMessage message={response.message} />
        ) : (
          <ErrorsFormMessage errors={response.message} />
        ))}

      {/* Submit button */}
      <div className="text-end">
        <SubmitButton>Izmeni podatke</SubmitButton>
      </div>
    </form>
  );
};

export default ProfileForm;

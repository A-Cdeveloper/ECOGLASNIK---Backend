"use client";

import { SubmitButton } from "@/app/_components/ui/Buttons/SubmitButton";
import ErrorsFormMessage from "@/app/_components/ui/Form/ErrorsFormMessage";
import InputPassword from "@/app/_components/ui/Form/InputPassword";
// import { useActionState } from "react";

import { UserRestrictedType } from "@/app/_utils/db/prismaTypes";
import { useCallback, useState } from "react";

// import ToggleSwitch from "@/app/_components/ui/Form/ToggleSwitch";
// import ErrorsForm from "../../../_components/ui/Form/ErrorsForm";
// import { addNewUserAction, updateUserAction } from "../_actions";
// import Select from "@/app/_components/ui/Form/Select";

const ProfilePasswordForm = ({ user }: { user?: UserRestrictedType }) => {
  const [formFields, setFormFields] = useState<{ [key: string]: string }>({
    password: "",
    passwordAgain: "",
  });

  const isPasswordValid = formFields.password === formFields.passwordAgain;

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormFields((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  ////////////
  // const action = user ? updateUserAction : addNewUserAction;

  // const [errors, formAction] = useActionState(action, []);

  return (
    <form action={() => {}} className="mt-4 w-full flex flex-col space-y-3">
      {/* {user && <input type="hidden" name="uid" value={user.uid} />} */}
      <InputPassword
        name="password"
        placeholder="Lozinka"
        onChange={handleInputChange}
        value={formFields.password}
      />
      <InputPassword
        name="passwordAgain"
        placeholder="Lozinka ponovo"
        onChange={handleInputChange}
        value={formFields.passwordAgain}
      />
      <div className="text-center p-0 m-0">
        {/* {errors.length > 0 && <ErrorsFormMessage errors={errors as string[]} />} */}
        {!isPasswordValid && formFields.passwordAgain && (
          <ErrorsFormMessage errors={["Lozinke se ne podudaraju"]} />
        )}{" "}
      </div>
      <div className="text-end">
        <SubmitButton>Postavi novu lozinku</SubmitButton>
      </div>
    </form>
  );
};

export default ProfilePasswordForm;

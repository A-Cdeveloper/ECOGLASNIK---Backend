"use client";

import { SubmitButton } from "@/app/_components/ui/Buttons/SubmitButton";
import ErrorsFormMessage from "@/app/_components/ui/Form/ErrorsFormMessage";
import InputPassword from "@/app/_components/ui/Form/InputPassword";

import { LogoutUserAction } from "@/app/(auth)/_actions";
import SuccessFormMessage from "@/app/_components/ui/Form/SuccessFormMessage";
import { useRouter } from "next/navigation";
import { useActionState, useCallback, useEffect, useState } from "react";
import { updateProfilePasswordAction } from "../_actions";
import { wait } from "@/app/_utils/helpers";

const ProfilePasswordForm = ({ userId }: { userId?: number }) => {
  const [formFields, setFormFields] = useState<{ [key: string]: string }>({
    password: "",
    passwordAgain: "",
  });

  const router = useRouter();

  const isPasswordValid = formFields.password === formFields.passwordAgain;

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormFields((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  ////////////

  const [response, formAction] = useActionState(updateProfilePasswordAction, {
    success: false,
    message: [],
  });

  useEffect(() => {
    if (response.success) {
      (async () => {
        await LogoutUserAction(userId);
        await wait(3000);
        router.replace("/");
      })();
    }
  }, [response, router, userId]);

  return (
    <form action={formAction} className="mt-4 w-full flex flex-col space-y-3">
      <input type="hidden" name="uid" value={userId} />
      <InputPassword
        name="password"
        placeholder="Lozinka"
        onChange={handleInputChange}
        value={formFields.password || ""}
      />
      <InputPassword
        name="passwordAgain"
        placeholder="Lozinka ponovo"
        onChange={handleInputChange}
        value={formFields.passwordAgain || ""}
      />
      <div className="text-center p-0 m-0">
        {!isPasswordValid && formFields.passwordAgain && (
          <ErrorsFormMessage errors={["Lozinke se ne podudaraju"]} />
        )}{" "}
      </div>
      {/* Success and error messages */}
      {response.message &&
        response.message.length > 0 &&
        (response.success ? (
          <SuccessFormMessage message={response.message} />
        ) : (
          <ErrorsFormMessage errors={response.message} />
        ))}
      {!isPasswordValid ||
        (formFields.passwordAgain && (
          <div className="text-end">
            <SubmitButton>Postavi novu lozinku</SubmitButton>
          </div>
        ))}
    </form>
  );
};

export default ProfilePasswordForm;

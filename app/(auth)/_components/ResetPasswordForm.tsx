"use client";
import { SubmitButton } from "@/app/_components/ui/Buttons/SubmitButton";
import ErrorsFormMessage from "@/app/_components/ui/Form/ErrorsFormMessage";
import InputPassword from "@/app/_components/ui/Form/InputPassword";
import { useActionState, useCallback, useState } from "react";
import { ResetPasswordAction } from "../_actions";
import SuccessFormMessage from "@/app/_components/ui/Form/SuccessFormMessage";
import Link from "next/link";

const ResetPasswordForm = ({
  verificationToken,
}: {
  verificationToken: string;
}) => {
  ////////////

  const [formFields, setFormFields] = useState<{ [key: string]: string }>({
    password: "",
    passwordAgain: "",
  });

  const isPasswordValid =
    formFields.password === formFields.passwordAgain &&
    formFields.password.length > 0;

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormFields((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const [response, formAction] = useActionState(ResetPasswordAction, {
    success: false,
    message: [],
  });

  let content = (
    <form action={formAction} className="space-y-3">
      {verificationToken && (
        <input
          type="hidden"
          name="verificationToken"
          value={verificationToken}
        />
      )}
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

      <div className="text-center">
        {response?.message && <ErrorsFormMessage errors={response.message} />}
        {!isPasswordValid && formFields.passwordAgain && (
          <ErrorsFormMessage errors={["Lozinke se ne podudaraju"]} />
        )}
        <SubmitButton disable={!isPasswordValid}>
          Postavi novu lozinku
        </SubmitButton>
      </div>
    </form>
  );

  if (response?.success) {
    content = (
      <div className="text-center">
        <SuccessFormMessage
          message={response?.message as string[]}
          animated={false}
        />{" "}
        <p className="text-secondary-500/80 text-[13px] text-center mt-4">
          Prijavi se <Link href="/">OVDE</Link>
        </p>
      </div>
    );
  }

  return <>{content}</>;
};

export default ResetPasswordForm;

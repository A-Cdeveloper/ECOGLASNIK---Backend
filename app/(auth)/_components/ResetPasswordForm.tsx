"use client";
import { SubmitButton } from "@/app/_components/ui/Buttons/SubmitButton";
import ErrorsFormMessage from "@/app/_components/ui/Form/ErrorsFormMessage";
import InputPassword from "@/app/_components/ui/Form/InputPassword";
import { useCallback, useState } from "react";

const ResetPasswordForm = () => {
  ////////////

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

  return (
    <form action={() => {}} className="space-y-3">
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
        {/* {errors.length > 0 && <ErrorsFormMessage errors={errors as string[]} />} */}
        {!isPasswordValid && formFields.passwordAgain && (
          <ErrorsFormMessage errors={["Lozinke se ne podudaraju"]} />
        )}
        <SubmitButton>Postavi novu lozinku</SubmitButton>
      </div>
    </form>
  );
};

export default ResetPasswordForm;

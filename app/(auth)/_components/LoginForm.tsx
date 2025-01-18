"use client";

import { SubmitButton } from "@/app/_components/ui/Buttons/SubmitButton";
import Input from "@/app/_components/ui/Form/Input";
import { useState } from "react";

import ErrorsForm from "@/app/_components/ui/Form/ErrorsForm";

import { useRouter } from "next/navigation";
import { LoginUserAction } from "../_actions";
import Link from "next/link";

const LoginForm = () => {
  ////////////

  const router = useRouter();

  const [errors, setErrors] = useState<string[]>([]);

  const handleSuccess = (result: string[] | boolean) => {
    if (Array.isArray(result)) {
      setErrors(result);
      return;
    }
    router.push("/dashboard");
  };

  return (
    <form
      action={async (formData: FormData) => {
        const result = (await LoginUserAction(null, formData)) as
          | string[]
          | boolean;

        handleSuccess(result); // Redirect only if no errors
      }}
      className="space-y-3"
    >
      <Input type="email" name="email" placeholder="E-mail adresa" />
      <Input type="password" name="password" placeholder="Lozinka" />

      <div className="text-center">
        {errors.length > 0 && <ErrorsForm errors={errors as string[]} />}
        <SubmitButton>Prijava</SubmitButton>
        <p className="text-secondary-500/80 text-[13px] text-center mt-4">
          <Link href="forgot-password">Zaboravljena lozinka?</Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;

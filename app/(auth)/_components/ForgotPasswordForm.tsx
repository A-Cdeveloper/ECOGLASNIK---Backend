"use client";

import { SubmitButton } from "@/app/_components/ui/Buttons/SubmitButton";
import Input from "@/app/_components/ui/Form/Input";
import Link from "next/link";
import { ForgotPasswordAction } from "../_actions";
import { useActionState } from "react";
import ErrorsFormMessage from "@/app/_components/ui/Form/ErrorsFormMessage";
import SuccessFormMessage from "@/app/_components/ui/Form/SuccessFormMessage";

const ForgotPasswordForm = () => {
  ////////////

  const [response, formAction] = useActionState(ForgotPasswordAction, {
    success: false,
    message: [],
  });

  let content = (
    <form action={formAction} className="space-y-3">
      <Input type="email" name="email" placeholder="E-mail adresa" />

      <div className="text-center">
        {response?.message && <ErrorsFormMessage errors={response.message} />}
        <SubmitButton>Zahtev za promenu lozinke</SubmitButton>
        <p className="text-secondary-500/80 text-[13px] text-center mt-4">
          <Link href="/">Vrati se na prijavu</Link>
        </p>
      </div>
    </form>
  );

  if (response?.success) {
    content = (
      <div className="text-center">
        <SuccessFormMessage
          message={response?.message as string[]}
          animated={false}
        />
      </div>
    );
  }

  return <>{content}</>;
};

export default ForgotPasswordForm;

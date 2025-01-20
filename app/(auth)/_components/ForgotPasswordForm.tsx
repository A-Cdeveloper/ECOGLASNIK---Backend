"use client";

import { SubmitButton } from "@/app/_components/ui/Buttons/SubmitButton";
import Input from "@/app/_components/ui/Form/Input";
import Link from "next/link";

const ForgotPasswordForm = () => {
  ////////////

  return (
    <form action={() => {}} className="space-y-3">
      <Input type="email" name="email" placeholder="E-mail adresa" />

      <div className="text-center">
        {/* {errors.length > 0 && <ErrorsFormMessage errors={errors as string[]} />} */}
        <SubmitButton>Zahtev za promenu lozinke</SubmitButton>
        <p className="text-secondary-500/80 text-[13px] text-center mt-4">
          <Link href="/">Vrati se na prijavu</Link>
        </p>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;

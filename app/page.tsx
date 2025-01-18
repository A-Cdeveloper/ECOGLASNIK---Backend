import React from "react";
import LoginForm from "./(auth)/_components/LoginForm";
import Logo from "./_components/layout/Logo";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("superAdminToken");

  if (token) {
    redirect("/dashboard");
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex-col flex-wrap w-[300px] justify-center items-center space-y-2 ">
        <Logo className="mx-auto" />
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;

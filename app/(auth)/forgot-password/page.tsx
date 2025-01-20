import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ForgotPasswordForm from "../_components/ForgotPasswordForm";

const ForgotPassword = async () => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("superAdminToken");

  if (token) {
    redirect("/dashboard");
  }

  return (
    <>
      <ForgotPasswordForm />
    </>
  );
};

export default ForgotPassword;

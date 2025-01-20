import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ResetPasswordForm from "../_components/ResetPasswordForm";

const ResetPassword = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("superAdminToken");

  // const verificationtoken = await searchParams;

  // console.log("token from url", verificationtoken.token);

  if (token) {
    redirect("/dashboard");
  }

  return <ResetPasswordForm />;
};

export default ResetPassword;

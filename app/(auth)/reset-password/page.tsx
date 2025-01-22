import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ResetPasswordForm from "../_components/ResetPasswordForm";
import ErrorsFormMessage from "@/app/_components/ui/Form/ErrorsFormMessage";

const ResetPassword = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("superAdminToken");

  const verificationToken = await searchParams;

  if (token) {
    redirect("/dashboard");
  }

  if (
    !verificationToken.token ||
    verificationToken.token === "null" ||
    verificationToken.token === null
  ) {
    return (
      <div className="text-center">
        <ErrorsFormMessage
          errors={["Verifikacioni token nije pronađen."]}
          animated={false}
        />
      </div>
    );
  }

  return <ResetPasswordForm verificationToken={verificationToken.token} />;
};

export default ResetPassword;

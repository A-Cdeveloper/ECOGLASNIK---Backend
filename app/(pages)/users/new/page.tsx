import BackButton from "@/app/_components/ui/Buttons/BackButton";
import Headline from "@/app/_components/ui/Headline";
import UserForm from "../_components/UserForm";
import { authSecurityPatch } from "@/app/_utils/auth/authSecurityPatch";

const AddUser = async () => {
  await authSecurityPatch();
  return (
    <div>
      <BackButton />
      <Headline level={1}>Dodaj novog superadmina</Headline>
      <UserForm />
    </div>
  );
};

export default AddUser;

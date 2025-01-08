import BackButton from "@/app/_components/ui/Buttons/BackButton";
import Headline from "@/app/_components/ui/Headline";
import UserForm from "../../_components/UserForm";
import { getUserById } from "@/app/_utils/api_utils/users";
import { UserRestrictedType } from "@/app/_utils/db/prismaTypes";

const EditUser = async ({ params }: { params: Promise<{ uid: number }> }) => {
  const user = await getUserById(+(await params).uid);

  return (
    <div>
      <BackButton />
      <Headline level={1}>Izmeni korisnika</Headline>
      <UserForm user={user as UserRestrictedType} />
    </div>
  );
};

export default EditUser;

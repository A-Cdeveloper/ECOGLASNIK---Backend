import BackButton from "@/app/_components/ui/Buttons/BackButton";
import Headline from "@/app/_components/ui/Headline";
import UserForm from "../../_components/UserForm";
import { getUserById } from "@/app/_utils/api_utils/users";
import { UserRestrictedType } from "@/app/types/prismaTypes";
import Link from "next/link";
import { UserRole } from "@prisma/client";
import { authSecurityPatch } from "@/app/_utils/auth/authSecurityPatch";

const EditUser = async ({ params }: { params: Promise<{ uid: number }> }) => {
  await authSecurityPatch();
  const user = await getUserById(+(await params).uid);

  let content = <UserForm user={user as UserRestrictedType} />;
  if (user?.role === UserRole.SUPERADMIN) {
    content = (
      <>
        <p>Ne mozete izmeniti podatke drugog superadmina.</p>
        <p>
          Vaše podatke možete izmeniti{" "}
          <Link href="/profile" className="underline">
            ovde.
          </Link>
        </p>
      </>
    );
  }

  return (
    <div>
      <BackButton />
      <Headline level={1}>Izmeni podatke korisnika</Headline>
      {content}
    </div>
  );
};

export default EditUser;

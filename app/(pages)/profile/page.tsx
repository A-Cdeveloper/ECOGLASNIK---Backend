import BackButton from "@/app/_components/ui/Buttons/BackButton";
import Headline from "@/app/_components/ui/Headline";
import Image from "next/image";
import ProfileForm from "./_components/ProfileForm";
import Button from "@/app/_components/ui/Buttons/Button";
import ProfilePasswordForm from "./_components/ProfilePasswordForm";
import { getUserFromToken } from "@/app/(auth)/_actions";
import { formatDate } from "@/app/_utils/helpers";
import { UserRestrictedType } from "@/app/_utils/db/prismaTypes";

const PageProfile = async () => {
  const user = await getUserFromToken();
  return (
    <>
      <BackButton />

      <div className="mt-4 w-full lg:w-2/3 xl:w-2/3 space-y-2">
        <div className="block lg:grid lg:grid-cols-[200px_1fr_1fr] gap-y-3 gap-x-8 items-start ">
          <div className="space-y-5">
            <Image
              src="/default-user.jpg"
              alt="default-user"
              width={250}
              height={100}
              className="rounded-full w-3/4 h-full mx-auto"
            />
            <div className="text-[13px]">
              Nalog Kreiran: {user && formatDate(user?.createdAt.toString())}
              <br />
              Poslednja izmena:{user && formatDate(user?.updatedAt.toString())}
            </div>
            <Button variation="danger">Obriši nalog</Button>
          </div>
          <div>
            <Headline level={3}>Podaci o korisniku</Headline>

            <ProfileForm user={user as UserRestrictedType} />
          </div>
          <div>
            <Headline level={3}>Promeni lozinku</Headline>
            <ProfilePasswordForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default PageProfile;

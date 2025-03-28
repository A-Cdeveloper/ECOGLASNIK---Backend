"use client";

import Headline from "@/app/_components/ui/Headline";
import { formatDate } from "@/app/_utils/helpers/";
import { UserContext } from "@/app/context/authContext";
import { UserRestrictedType } from "@/app/types/prismaTypes";
import Image from "next/image";
import { use } from "react";
import ProfileDelete from "./ProfileDelete";
import ProfileForm from "./ProfileForm";
import ProfilePasswordForm from "./ProfilePasswordForm";

const Profile = () => {
  const { user, refreshUser } = use(UserContext);

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="space-y-4">
        <Image
          src="/default-user.jpg"
          alt="default-user"
          width={250}
          height={100}
          className="rounded-full w-[150px] 2xl:w-3/4 h-full ms-0 lg:mx-auto"
        />
        <div className="text-[13px]">
          Nalog Kreiran: {formatDate(user?.createdAt.toString())}
          <br />
          Poslednja izmena:
          {formatDate(user?.updatedAt.toString())}
        </div>
      </div>
      <div>
        <ProfileForm
          user={user as UserRestrictedType}
          refreshUser={refreshUser}
        />
      </div>
      <div>
        <Headline level={3}>Promeni lozinku</Headline>
        <ProfilePasswordForm userId={user.uid as number} />
      </div>
      <ProfileDelete userId={user.uid as number} />
    </>
  );
};

export default Profile;

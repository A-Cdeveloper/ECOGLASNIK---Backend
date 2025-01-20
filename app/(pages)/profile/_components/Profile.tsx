"use client";

import Headline from "@/app/_components/ui/Headline";
import { UserRestrictedType } from "@/app/_utils/db/prismaTypes";
import { useUser } from "@/app/context/authContext";
import Image from "next/image";
import ProfileForm from "./ProfileForm";
import ProfilePasswordForm from "./ProfilePasswordForm";
import { formatDate } from "@/app/_utils/helpers";
const Profile = () => {
  const { user, refreshUser, removeSessionStorageData } = useUser();

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
          Nalog Kreiran: {user && formatDate(user?.createdAt.toString())}
          <br />
          Poslednja izmena:
          {formatDate(user && user?.updatedAt.toString())}
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
        <ProfilePasswordForm
          userId={user && (user.uid as number)}
          removeSessionStorageData={removeSessionStorageData}
        />
      </div>
    </>
  );
};

export default Profile;

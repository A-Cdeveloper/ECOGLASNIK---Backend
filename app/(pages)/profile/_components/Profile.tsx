"use client";

import Button from "@/app/_components/ui/Buttons/Button";
import Headline from "@/app/_components/ui/Headline";
import { UserRestrictedType } from "@/app/_utils/db/prismaTypes";
import { formatDate } from "@/app/_utils/helpers";
import { useUser } from "@/app/context/userContext";
import Image from "next/image";
import ProfileForm from "./ProfileForm";
import ProfilePasswordForm from "./ProfilePasswordForm";
import { useEffect, useState } from "react";

const Profile = () => {
  const { user, refreshUser } = useUser();
  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    if (!user) return;
    setCurrentUser(user);
  }, [user]);

  return (
    <>
      <div className="block md:grid-cols-[200px_1fr_1fr] lg:grid lg:grid-cols-[200px_1fr_1fr] gap-x-8  items-start space-y-5 lg:space-y-0 mb-8">
        <div className="space-y-4">
          <Image
            src="/default-user.jpg"
            alt="default-user"
            width={250}
            height={100}
            className="rounded-full w-[150px] 2xl:w-3/4 h-full ms-0 lg:mx-auto"
          />
          <div className="text-[13px]">
            Nalog Kreiran:{" "}
            {currentUser && formatDate(currentUser?.createdAt.toString())}
            <br />
            Poslednja izmena:
            {currentUser && formatDate(currentUser?.updatedAt.toString())}
          </div>{" "}
        </div>

        <div>
          <Headline level={3}>Podaci o korisniku</Headline>

          <ProfileForm
            user={currentUser as UserRestrictedType}
            refreshUser={refreshUser}
          />
        </div>

        <div>
          <Headline level={3}>Promeni lozinku</Headline>
          <ProfilePasswordForm />
        </div>
      </div>
      <div className="text-end border-t border-b border-secondary-500/20 py-2">
        <Button variation="danger">Obriši nalog</Button>
      </div>
    </>
  );
};

export default Profile;

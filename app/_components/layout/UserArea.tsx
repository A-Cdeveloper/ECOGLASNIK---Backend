"use client";

import { UserRestrictedType } from "@/app/_utils/db/prismaTypes";
import useOutsideClick from "@/app/hooks/useOutsideClick";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getDisplayName } from "../../_utils/helpers";
import UserMiniMenu from "./UserMiniMenu";

const UserArea = ({ user }: { user: UserRestrictedType }) => {
  const [miniMenuOpen, setMiniMenuOpen] = useState(false);
  const [displayName, setDisplayName] = useState(
    user.firstname + " " + user.lastname
  );

  const { refEl } = useOutsideClick(() => setMiniMenuOpen(false));

  useEffect(() => {
    const handleResize = () =>
      setDisplayName(
        window.innerWidth < 768 ? getDisplayName(displayName) : displayName
      );

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [displayName]);

  return (
    <div
      className="flex items-center gap-x-2 relative h-[60px] cursor-pointer"
      onClick={() => setMiniMenuOpen(!miniMenuOpen)}
    >
      <Image
        src="/default-user.jpg"
        alt="default-user"
        width={250}
        height={100}
        className="rounded-full w-6 h-6"
      />
      <span className="text-[14px]">{displayName}</span>

      <UserMiniMenu miniMenuOpen={miniMenuOpen} refEl={refEl} />
    </div>
  );
};

export default UserArea;

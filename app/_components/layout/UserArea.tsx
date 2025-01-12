"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import UserMiniMenu from "./UserMiniMenu";
import { getDisplayName } from "../../_utils/helpers";
import useOutsideClick from "@/app/hooks/useOutsideClick";

const UserArea = () => {
  const [miniMenuOpen, setMiniMenuOpen] = useState(false);
  const [displayName, setDisplayName] = useState("Aleksandar Cvetković");

  const { refEl } = useOutsideClick(() => setMiniMenuOpen(false));

  useEffect(() => {
    const handleResize = () =>
      setDisplayName(
        window.innerWidth < 768
          ? getDisplayName("Aleksandar Cvetković")
          : "Aleksandar Cvetković"
      );

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

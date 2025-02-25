"use client";

import { UserContext } from "@/app/context/authContext";
import useOutsideClick from "@/app/hooks/useOutsideClick";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { getDisplayName } from "../../_utils/helpers";
import MiniSpinner from "./MiniSpinner";
import UserMiniMenu from "./UserMiniMenu";

const UserArea = () => {
  const { user } = use(UserContext);

  const [miniMenuOpen, setMiniMenuOpen] = useState(false);
  const [displayName, setDisplayName] = useState("");

  const { refEl } = useOutsideClick(() => setMiniMenuOpen(false));

  // Update `displayName` whenever `user` changes
  useEffect(() => {
    if (user) {
      const fullName = `${user.firstname} ${user.lastname}`;
      const updatedDisplayName =
        window.innerWidth < 768 ? getDisplayName(fullName) : fullName;

      setDisplayName(updatedDisplayName);
    }
  }, [user]);

  // Handle resizing logic
  useEffect(() => {
    const handleResize = () => {
      if (user) {
        const fullName = `${user.firstname} ${user.lastname}`;
        setDisplayName(
          window.innerWidth < 768 ? getDisplayName(fullName) : fullName
        );
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [user]);

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
      <span className="text-[14px]">
        {user ? displayName : <MiniSpinner />}
      </span>

      <UserMiniMenu
        miniMenuOpen={miniMenuOpen}
        refEl={refEl}
        userId={user?.uid}
      />
    </div>
  );
};

export default UserArea;

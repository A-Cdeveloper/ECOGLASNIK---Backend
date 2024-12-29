import React from "react";
import { HiArrowRightOnRectangle, HiOutlineUser } from "react-icons/hi2";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="h-[65px] w-full flex justify-between items-center  px-4 fixed z-30 border-secondary-500/20 border-b bg-rose start-0 top-0">
      <Logo />
      <div className="flex items-center gap-x-3">
        <img
          src="/default-user.jpg"
          alt="default-user"
          width={250}
          height={100}
          className="rounded-full w-7 h-7"
        />
        Aleksandar Cvetkovic
        <HiOutlineUser />
        <HiArrowRightOnRectangle />
      </div>
    </header>
  );
};

export default Header;

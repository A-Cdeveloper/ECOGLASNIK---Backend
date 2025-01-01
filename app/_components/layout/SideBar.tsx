"use client";

import clsx from "clsx";
import { useState } from "react";
import IconButton from "../ui/Buttons/IconButton";
import { HiChevronDoubleRight, HiChevronDoubleLeft } from "react-icons/hi2";

const SideBar = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setiSSidebarOpen] = useState(true);

  const openSidebarClass = `${
    isSidebarOpen ? "w-[50px] xl:w-[270px]" : "w-[270px] bg-primary-900/90"
  }`;
  return (
    <aside
      className={clsx(
        `text-white h-screen border-r border-secondary-500/20 fixed top-[60px] start-0 z-30 overflow-hidden transition-width 
    duration-300 ease-in-out`,
        openSidebarClass
      )}
    >
      <IconButton
        className="cursor-pointer block xl:hidden w-full ps-3 py-2 text-winter-100/80 absolute"
        icon={
          isSidebarOpen ? <HiChevronDoubleRight /> : <HiChevronDoubleLeft />
        }
        onClick={() => setiSSidebarOpen(!isSidebarOpen)}
      />
      {/* navigation */}
      {children}
    </aside>
  );
};

export default SideBar;

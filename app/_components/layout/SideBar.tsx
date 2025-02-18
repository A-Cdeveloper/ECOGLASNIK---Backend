"use client";

import useOutsideClick from "@/app/hooks/useOutsideClick";
import clsx from "clsx";
import { useState } from "react";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi2";
import IconButton from "../ui/Buttons/IconButton";
import FrontEndLink from "./FrontEndLink";

const SideBar = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setiSSidebarOpen] = useState(true);

  const { refEl } = useOutsideClick(() => setiSSidebarOpen(true));

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
      <div ref={refEl}>
        <IconButton
          className="cursor-pointer block xl:hidden w-full ps-3 py-2 text-winter-100/80 absolute"
          icon={
            isSidebarOpen ? <HiChevronDoubleRight /> : <HiChevronDoubleLeft />
          }
          onClick={() => setiSSidebarOpen(!isSidebarOpen)}
        />
      </div>
      {/* navigation */}
      {children}
      <FrontEndLink />
    </aside>
  );
};

export default SideBar;

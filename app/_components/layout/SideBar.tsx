"use client";

import { useState } from "react";
import Navigation from "./Navigation";
import clsx from "clsx";

const SideBar = () => {
  const [isSidebarOpen, setiSSidebarOpen] = useState(true);

  const openSidebarClass = `${
    isSidebarOpen ? "w-[50px] lg:w-[270px]" : "w-[270px] bg-primary-900/90"
  }`;
  return (
    <aside
      className={clsx(
        `text-white h-screen border-r border-secondary-500/20  fixed top-[65px] start-0 z-40 overflow-hidden transition-width duration-300 ease-in-out`,
        openSidebarClass
      )}
    >
      <div
        className="absolute top-[50%] -right-3 cursor-pointer bg-green-900 block lg:hidden"
        onClick={() => setiSSidebarOpen(!isSidebarOpen)}
      >
        Close
      </div>

      <Navigation />
    </aside>
  );
};

export default SideBar;

import { BASE_URL } from "@/app/config";
import Link from "next/link";
import React from "react";
import { HiGlobeAlt } from "react-icons/hi2";

const FrontEndLink = () => {
  return (
    <div className="fixed bottom-0 mb-2 p-[8px] py-3 w-[50px] xl:w-[270px] overflow-hidden">
      <Link
        href={BASE_URL}
        target="_blank"
        className="flex items-center gap-x-1 text-winter-100/50 hover:text-winter-100 transition-colors duration-300"
      >
        <HiGlobeAlt className="text-[30px]" />
        <span className="hidden xl:flex font-semibold">ECOGLASNIK APP</span>
      </Link>
    </div>
  );
};

export default FrontEndLink;

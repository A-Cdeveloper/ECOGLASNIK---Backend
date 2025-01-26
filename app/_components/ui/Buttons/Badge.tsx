import React from "react";

const Badge = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="bg-turquoise-900 inline-block w-[25px] h-[22px] text-center text-winter-900 text-[14px] leading-[21px] font-semibold rounded-[5px]">
      {children}
    </span>
  );
};

export default Badge;

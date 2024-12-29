import React from "react";
import Image from "next/image";
import Link from "next/link";

const logo = "/clean-me.fw.png";

const Logo = () => {
  return (
    <div className="relative w-[230px]">
      <Link href="/">
        <Image
          src={logo}
          alt="Logo"
          width={200}
          height={50}
          priority
          className="w-full h-full object-cover object-center"
        />
      </Link>
    </div>
  );
};

export default Logo;

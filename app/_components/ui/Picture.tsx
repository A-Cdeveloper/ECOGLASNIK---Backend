import Image from "next/image";
import React from "react";
import noImage from "@/public/no-image.png";
import clsx from "clsx";

const Picture = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  if (!src) {
    return (
      <div
        className={clsx(`w-full h-[100px] md:w-[90px]  md:h-[70px]`, className)}
      >
        <Image
          src={noImage}
          width={450}
          height={300}
          alt={alt}
          className="w-full h-full object-cover object-center border border-secondary-500/20 p-1"
        />
      </div>
    );
  }

  return (
    <div
      className={clsx(`w-full h-[100px] md:w-[90px]  md:h-[70px]`, className)}
    >
      <Image
        src={src}
        width={450}
        height={300}
        alt={alt}
        className="w-full h-full object-cover object-center border border-secondary-500/20 p-1"
      />
    </div>
  );
};

export default Picture;

"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({
  children,
  href,
  icon,
}: {
  children: React.ReactNode;
  href: string;
  icon?: React.ReactNode;
}) => {
  const pathname = usePathname();

  const linkClassName =
    "text-winter-100/50 hover:text-winter-100 hover:bg-primary-100 transition-colors duration-300";
  const activeClassName = "bg-primary-100 text-winter-100 groupactive";

  const isActive = href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <li className="group">
      <Link
        href={href}
        className={clsx(
          `flex gap-x-3 items-center py-2 px-3 text-[14px] uppercase font-semibold`,
          isActive ? activeClassName : linkClassName
        )}
      >
        <span className="text-[20px] group-hover:text-winter-100">{icon}</span>
        <span>{children}</span>
      </Link>
    </li>
  );
};

export default NavLink;

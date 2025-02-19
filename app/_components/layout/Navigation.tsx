import NavLink from "./NavLink";

import {
  HiMiniDocument,
  HiOutlineBellAlert,
  HiOutlineBriefcase,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineSquare3Stack3D,
  HiOutlineUsers,
  HiOutlineWrenchScrewdriver,
} from "react-icons/hi2";

const Navigation = () => {
  return (
    <nav className="py-7">
      <ul>
        <NavLink href="/dashboard" icon={<HiOutlineHome />}>
          Početna
        </NavLink>
        <NavLink href="/categories" icon={<HiOutlineSquare3Stack3D />}>
          Kategorije
        </NavLink>
        <NavLink href="/problems" icon={<HiOutlineBellAlert />}>
          Problemi
        </NavLink>
        <NavLink href="/organisations" icon={<HiOutlineWrenchScrewdriver />}>
          Službe
        </NavLink>
        <NavLink href="/partners" icon={<HiOutlineBriefcase />}>
          Partneri
        </NavLink>
        <NavLink href="/users" icon={<HiOutlineUsers />}>
          Korisnici
        </NavLink>

        <NavLink href="/settings" icon={<HiOutlineCog6Tooth />}>
          Podešavanja
        </NavLink>

        <NavLink href="/reports" icon={<HiMiniDocument />}>
          Izveštaji
        </NavLink>
      </ul>
    </nav>
  );
};

export default Navigation;

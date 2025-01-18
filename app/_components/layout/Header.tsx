import { getUserFromToken } from "@/app/(auth)/_actions";
import { UserRestrictedType } from "@/app/_utils/db/prismaTypes";
import Logo from "./Logo";
import UserArea from "./UserArea";

const Header = async () => {
  const user = await getUserFromToken();

  return (
    <header className="h-[60px] w-full flex justify-between items-center  px-4 fixed z-30 border-secondary-500/20 border-b bg-rose start-0 top-0">
      <Logo />
      <div className="flex items-center gap-x-3">
        <UserArea user={user as UserRestrictedType} />
      </div>
    </header>
  );
};

export default Header;

import { LogoutUserAction } from "@/app/(auth)/_actions";
import { useRouter } from "next/navigation";
import {
  HiOutlineArrowRightStartOnRectangle,
  HiOutlineUser,
} from "react-icons/hi2";

const UserMiniMenu = ({
  miniMenuOpen,
  refEl,
  userId,
}: {
  miniMenuOpen: boolean;
  refEl: React.RefObject<HTMLDivElement>;
  userId: number;
}) => {
  const router = useRouter();

  return (
    <div
      className={`absolute w-[150px] bg-primary-900/90 top-[100%] end-0 flex flex-col justify-center opacity-0 translate-y-0 transition-all duration-300  rounded-b-sm border border-secondary-500/20 border-t-0 ${
        miniMenuOpen
          ? "opacity-100 translate-y-0 block"
          : "-translate-y-4 hidden"
      }`}
      ref={refEl}
    >
      <div
        onClick={() => router.push("/profile")}
        className="flex gap-x-2 items-center hover:bg-primary-100 p-2"
      >
        <span className="text-[18px]">
          <HiOutlineUser />
        </span>
        Profile
      </div>
      <div
        onClick={async () => {
          await LogoutUserAction(userId as number);
          sessionStorage.clear();
          router.push("/");
        }}
        className="flex gap-x-2 items-center hover:bg-primary-100 p-2"
      >
        <span className="text-[18px]">
          <HiOutlineArrowRightStartOnRectangle />
        </span>
        Logout
      </div>
    </div>
  );
};

export default UserMiniMenu;

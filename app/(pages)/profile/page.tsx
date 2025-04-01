import BackButton from "@/app/_components/ui/Buttons/BackButton";
import Profile from "./_components/Profile";
import { authSecurityPatch } from "@/app/_utils/auth/authSecurityPatch";

const PageProfile = async () => {
  await authSecurityPatch();
  return (
    <>
      <BackButton />

      <div className="mt-4 w-full 2xl:w-3/4 space-y-2">
        <div className="block md:grid-cols-[200px_1fr_1fr] lg:grid lg:grid-cols-[200px_1fr_1fr] gap-8 items-start space-y-5 lg:space-y-0 mb-8">
          <Profile />
        </div>
      </div>
    </>
  );
};

export default PageProfile;

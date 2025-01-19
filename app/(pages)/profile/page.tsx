import BackButton from "@/app/_components/ui/Buttons/BackButton";
import Profile from "./_components/Profile";

const PageProfile = () => {
  return (
    <>
      <BackButton />

      <div className="mt-4 w-full  2xl:w-3/4 space-y-2">
        <Profile />
      </div>
    </>
  );
};

export default PageProfile;

import BackButton from "@/app/_components/ui/Buttons/BackButton";
import Headline from "@/app/_components/ui/Headline";
import UserForm from "../_components/UserForm";

const AddUser = async () => {
  return (
    <div>
      <BackButton />
      <Headline level={1}>Dodaj novog superadmina</Headline>
      <UserForm />
    </div>
  );
};

export default AddUser;

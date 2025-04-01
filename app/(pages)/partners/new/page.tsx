import BackButton from "@/app/_components/ui/Buttons/BackButton";
import Headline from "@/app/_components/ui/Headline";
import PartnersForm from "../_components/PartnersForm";
import { authSecurityPatch } from "@/app/_utils/auth/authSecurityPatch";

const AddPartner = async () => {
  await authSecurityPatch();
  return (
    <div>
      <BackButton />
      <Headline level={1}>Dodaj novog partnera</Headline>
      <PartnersForm />
    </div>
  );
};

export default AddPartner;

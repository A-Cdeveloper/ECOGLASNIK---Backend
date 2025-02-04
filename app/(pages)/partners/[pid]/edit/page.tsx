import BackButton from "@/app/_components/ui/Buttons/BackButton";
import Headline from "@/app/_components/ui/Headline";
import { getPartner } from "@/app/_utils/api_utils/partners";
import PartnersForm from "../../_components/PartnersForm";
import { Partners } from "@prisma/client";

const EditPartner = async ({
  params,
}: {
  params: Promise<{ pid: string }>;
}) => {
  const partner = await getPartner((await params).pid);

  return (
    <div>
      <BackButton />
      <Headline level={1}>Izmeni partnera</Headline>
      <PartnersForm partner={partner as Partners} />
    </div>
  );
};

export default EditPartner;

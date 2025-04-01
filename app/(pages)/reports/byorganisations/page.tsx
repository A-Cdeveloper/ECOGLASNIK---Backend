import BackButton from "@/app/_components/ui/Buttons/BackButton";
import Headline from "@/app/_components/ui/Headline";
import ProblemsOrganisations from "../_components/ProblemsOrganisations";
import { authSecurityPatch } from "@/app/_utils/auth/authSecurityPatch";

const ProblemsByOrganisationsReportPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ organisationId: string }>;
}) => {
  await authSecurityPatch();
  return (
    <>
      <BackButton />
      <Headline level={1}>
        Prijavljeni komunalni problemi za sve službe za izabrani period
      </Headline>
      <ProblemsOrganisations searchParams={searchParams} />
    </>
  );
};

export default ProblemsByOrganisationsReportPage;

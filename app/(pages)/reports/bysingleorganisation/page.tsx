import BackButton from "@/app/_components/ui/Buttons/BackButton";
import Headline from "@/app/_components/ui/Headline";
import ProblemsOrganisation from "../_components/ProblemsOrganisation";
import { authSecurityPatch } from "@/app/_utils/auth/authSecurityPatch";

const ProblemsBySingleOrganisationsReportPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ organisationId: string }>;
}) => {
  await authSecurityPatch();
  return (
    <>
      <BackButton to="/reports" />
      <Headline level={1}>
        Prijavljeni komunalni problemi za službu za izabrani period
      </Headline>
      <ProblemsOrganisation searchParams={searchParams} />
    </>
  );
};

export default ProblemsBySingleOrganisationsReportPage;

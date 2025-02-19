import BackButton from "@/app/_components/ui/Buttons/BackButton";
import Headline from "@/app/_components/ui/Headline";
import ProblemsOrganisations from "../_components/ProblemsOrganisations";

const ProblemsByOrganisationsReportPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ organisationId: string }>;
}) => {
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

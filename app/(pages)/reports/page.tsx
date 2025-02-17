import Headline from "@/app/_components/ui/Headline";
import ProblemsByOrganisations from "./_components/ProblemsByOrganisations";

const ReportsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ organisationId: string }>;
}) => {
  return (
    <>
      <Headline level={1} className="mb-5">
        Izveštaji
      </Headline>
      <ProblemsByOrganisations searchParams={searchParams} />
    </>
  );
};

export default ReportsPage;

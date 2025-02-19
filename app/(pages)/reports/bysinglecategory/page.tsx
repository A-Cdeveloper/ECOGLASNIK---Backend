import BackButton from "@/app/_components/ui/Buttons/BackButton";
import Headline from "@/app/_components/ui/Headline";
import ProblemsCategory from "../_components/ProblemsCategory";

const ProblemsBySingleCateogryReportPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ organisationId: string }>;
}) => {
  return (
    <>
      <BackButton to="/reports" />
      <Headline level={1}>
        Prijavljeni komunalni problemi za kategoriju za izabrani period
      </Headline>
      <ProblemsCategory searchParams={searchParams} />
    </>
  );
};

export default ProblemsBySingleCateogryReportPage;

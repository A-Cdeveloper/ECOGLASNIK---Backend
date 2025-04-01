import BackButton from "@/app/_components/ui/Buttons/BackButton";
import ProblemsCategories from "../_components/ProblemsCategories";
import Headline from "@/app/_components/ui/Headline";
import { authSecurityPatch } from "@/app/_utils/auth/authSecurityPatch";

const ProblemsByCategoriesReportPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ organisationId: string }>;
}) => {
  await authSecurityPatch();
  return (
    <>
      <BackButton />
      <Headline level={1}>
        Prijavljeni komunalni problemi sve kategorije za izabrani period
      </Headline>
      <ProblemsCategories searchParams={searchParams} />
    </>
  );
};

export default ProblemsByCategoriesReportPage;

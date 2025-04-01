import Headline from "@/app/_components/ui/Headline";
import { Suspense } from "react";
import { AllCategoriesSkeleton } from "../../categories/_components/AllCategories";
import ArchiveProblems from "../_components/ArchiveProblems";
import BackButton from "@/app/_components/ui/Buttons/BackButton";
import { authSecurityPatch } from "@/app/_utils/auth/authSecurityPatch";

const ProblemsArchivePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  await authSecurityPatch();
  return (
    <>
      <BackButton />
      <Headline level={1}>Arhivirani problemi</Headline>

      <Suspense fallback={<AllCategoriesSkeleton />}>
        <ArchiveProblems searchParams={searchParams} />
      </Suspense>
    </>
  );
};

export default ProblemsArchivePage;

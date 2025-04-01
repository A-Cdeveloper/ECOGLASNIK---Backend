import Headline from "@/app/_components/ui/Headline";
import { Suspense } from "react";
import AllPartners, { AllPartnersSkeleton } from "./_components/AllPartners";
import { authSecurityPatch } from "@/app/_utils/auth/authSecurityPatch";

const PartnersPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  await authSecurityPatch();
  return (
    <>
      <Headline level={1}>Partneri</Headline>

      <Suspense fallback={<AllPartnersSkeleton />}>
        <AllPartners searchParams={searchParams} />
      </Suspense>
    </>
  );
};

export default PartnersPage;

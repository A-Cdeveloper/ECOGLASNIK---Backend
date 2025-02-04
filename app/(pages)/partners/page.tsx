import Headline from "@/app/_components/ui/Headline";
import { Suspense } from "react";
import AllPartners, { AllPartnersSkeleton } from "./_components/AllPartners";

const PartnersPage = ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
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

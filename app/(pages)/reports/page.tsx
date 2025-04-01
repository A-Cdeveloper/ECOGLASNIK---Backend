import Headline from "@/app/_components/ui/Headline";
import { authSecurityPatch } from "@/app/_utils/auth/authSecurityPatch";
import Link from "next/link";

const ReportsPage = async () => {
  await authSecurityPatch();
  return (
    <>
      <Headline level={1} className="mb-5">
        Izveštaji
      </Headline>
      <ul className="space-y-2 flex flex-col">
        <li className="p-2 border-1 border-secondary-100/30 self-start min-w-auto md:min-w-[500px] hover:bg-secondary-900 cursor-pointer transition-all delay-100">
          <Link href="/reports/byorganisations">
            Prijavljeni komunalni problemi sve službe za period.
          </Link>
        </li>
        <li className="p-2 border-1 border-secondary-100/30 self-start min-w-auto md:min-w-[500px] hover:bg-secondary-900 cursor-pointer transition-all delay-100">
          <Link href="/reports/bycategories">
            Prijavljeni komunalni problemi sve kategorije za period.
          </Link>
        </li>
        <li className="p-2 border-1 border-secondary-100/30 self-start min-w-auto md:min-w-[500px] hover:bg-secondary-900 cursor-pointer transition-all delay-100">
          <Link href="/reports/bysingleorganisation">
            Prijavljeni komunalni problemi za određenu službu za period.
          </Link>
        </li>
        <li className="p-2 border-1 border-secondary-100/30 self-start min-w-auto md:min-w-[500px] hover:bg-secondary-900 cursor-pointer transition-all delay-100">
          <Link href="/reports/bysinglecategory">
            Prijavljeni komunalni problemi po određenu kategoriju za period.
          </Link>
        </li>
      </ul>
    </>
  );
};

export default ReportsPage;

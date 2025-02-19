import Headline from "@/app/_components/ui/Headline";
import Link from "next/link";

const ReportsPage = () => {
  return (
    <>
      <Headline level={1} className="mb-5">
        Izveštaji
      </Headline>
      <ul className="space-y-2">
        <li>
          <Link href="/reports/byorganisations">
            Prijavljeni komunalni problemi sve službe za period.
          </Link>
        </li>
        <li>
          <Link href="/reports/bycategories">
            Prijavljeni komunalni problemi sve kategorije za period.
          </Link>
        </li>
        <li>
          <Link href="/reports/bysingleorganisation">
            Prijavljeni komunalni problemi za određenu službu za period.
          </Link>
        </li>
        <li>
          <Link href="/reports/byorganisations">
            Prijavljeni komunalni problemi po određenu kategoriju za period.
          </Link>
        </li>
      </ul>
    </>
  );
};

export default ReportsPage;

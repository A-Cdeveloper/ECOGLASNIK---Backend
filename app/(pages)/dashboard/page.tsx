import Headline from "@/app/_components/ui/Headline";
import GeneralStats from "./_components/GeneralStats";

export default function HomePage() {
  return (
    <>
      <Headline level={1}>Dobro došli</Headline>
      <GeneralStats />
      <div className="mt-4 w-full 2xl:w-2/3 space-y-2 flex justify-between items-center bg-rose-500">
        <div>#USERS</div>
        <div>#PRoblems last</div>
      </div>

      <div className="mt-4 w-full 2xl:w-3/4 space-y-2 flex justify-between items-center bg-rose-500">
        grafici
        <div>problemi po kategorijama</div>
        <div>problemi po vremenu </div>
        <div>problemi po organizacijama</div>
      </div>
    </>
  );
}

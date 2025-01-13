/* eslint-disable @typescript-eslint/no-explicit-any */
import BackButton from "@/app/_components/ui/Buttons/BackButton";
import Headline from "@/app/_components/ui/Headline";
import { getProblemById } from "@/app/_utils/api_utils/problems-api";

const ProblemPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const problem = await getProblemById(id);

  return (
    <>
      <BackButton />

      <Headline level={1}>{problem?.title}</Headline>

      {/* <div className="grid grid-cols-[250px,1fr] mt-4 gap-y-3">
        <div>Nadlezne sluzbe</div>
        <div>
          {category?.organisations?.map((org) => {
            return <p key={org.oid}>{org.organisation_name}</p>;
          })}
        </div>
        <div>Broj prijavljenih problema:</div>
        <div>{category?.problems?.length}</div>
        <div>Broj aktivnih/resenih problema:</div>
        <div>
          {category?.problems?.filter((p) => p.status === "active").length} /{" "}
          {category?.problems?.filter((p) => p.status === "done").length}
        </div>

        <div>Prijavljeni Problemi</div>
        <div>
          {category?.problems?.map((problem: any) => (
            <div key={problem.id}>
              {problem.title} - {problem.status}
            </div>
          ))}
        </div>
      </div> */}
    </>
  );
};

export default ProblemPage;

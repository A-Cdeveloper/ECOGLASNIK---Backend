/* eslint-disable @typescript-eslint/no-explicit-any */
import BackButton from "@/app/_components/ui/Buttons/BackButton";
import Headline from "@/app/_components/ui/Headline";
import { getCategoryById } from "@/app/_utils/api_utils/categories";
import React from "react";
// import AllProblems from "../../problems/_components/AllProblems";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ cat_id: string }>;
}) => {
  const { cat_id } = await params;
  const category = await getCategoryById(+cat_id);

  // console.log(category?.problems);

  return (
    <>
      <BackButton />

      <Headline level={1}>{category?.cat_name}</Headline>

      <div className="grid grid-cols-[250px,1fr] mt-4 gap-y-3">
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
          {/* <AllProblems problems={category?.problems} /> */}
        </div>
      </div>
    </>
  );
};

export default CategoryPage;

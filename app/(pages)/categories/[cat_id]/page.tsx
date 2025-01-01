/* eslint-disable @typescript-eslint/no-explicit-any */
import BackButton from "@/app/_components/ui/Buttons/BackButton";
import Headline from "@/app/_components/ui/Headline";
import { getCategoryById } from "@/app/_utils/api_utils/categories";
import React from "react";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ cat_id: string }>;
}) => {
  const { cat_id } = await params;
  const category = await getCategoryById(+cat_id);

  return (
    <>
      <BackButton />
      <Headline level={1}>{category?.cat_name}</Headline>
      <p>Broj prijavljenih problema: {category?.problems?.length}</p>
      {category?.problems?.map((problem: any) => (
        <div key={problem.id}>
          {problem.title} - {problem.status}
        </div>
      ))}
    </>
  );
};

export default CategoryPage;

import FilterSelector from "@/app/_components/ui/Filters/FilterSelector";
import { getAllCategories } from "@/app/_utils/api_utils/categories";
import React from "react";

const FilterCategories = async () => {
  const { categories: categoriesApi } = (await getAllCategories()) as {
    categories: { cat_id: number; cat_name: string }[];
  };

  const categoriesSelection = categoriesApi?.map((cat) => {
    return {
      id: cat.cat_id.toString(),
      label: cat.cat_name,
    };
  });

  return (
    <FilterSelector
      filterList={categoriesSelection || []}
      queryKey="category"
    />
  );
};

export default FilterCategories;

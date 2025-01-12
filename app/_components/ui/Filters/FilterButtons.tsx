import React from "react";
import FilterButton from "./FilterButton";

export type FilterOption = {
  value: string;
  label: string;
};

type FilterButtonsProps<T extends FilterOption> = {
  filterList: T[];
  queryKey: string;
};

const FilterButtons = <T extends FilterOption>({
  filterList,
  queryKey,
}: FilterButtonsProps<T>) => {
  return (
    <div className="flex gap-x-0 my-3 w-full lg:w-auto">
      {filterList.map((option) => {
        return (
          <FilterButton
            key={option.label}
            activeStatus={option.value}
            queryKey={queryKey}
          >
            {option.label}
          </FilterButton>
        );
      })}
    </div>
  );
};

export default FilterButtons;

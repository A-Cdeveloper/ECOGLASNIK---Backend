import React from "react";
import FilterButton from "./FilterButton";

export type FilterOption = {
  value: string;
  label: string;
};

type FilterButtonsProps<T extends FilterOption> = {
  filterList: T[];
  queryKey: string;
  className?: string;
};

const FilterButtons = <T extends FilterOption>({
  filterList,
  queryKey,
  className,
}: FilterButtonsProps<T>) => {
  return (
    <div className={`flex gap-x-0 my-3 w-full lg:w-auto ${className}`}>
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

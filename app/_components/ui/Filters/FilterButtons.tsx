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
    <div className="me-0 md:me-auto ms-0 lg:ms-8 flex gap-x-0 my-3">
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

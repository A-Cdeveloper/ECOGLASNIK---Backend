import Badge from "@/app/_components/ui/Buttons/Badge";
import FilterButtons from "@/app/_components/ui/Filters/FilterButtons";
import Headline from "@/app/_components/ui/Headline";
import React from "react";

const TopSection = ({
  itemsCount,
  filteredItems,
  children,
  queryKey,
}: {
  itemsCount: number;
  filteredItems: { label: string; value: string }[];
  children: React.ReactNode;
  queryKey: string;
}) => {
  return (
    <div className="flex flex-wrap justify-between items-center border-b border-secondary-100/20 px-0 py-2">
      <Headline level={3} className="normal-case font-thin w-full 3xl:w-auto">
        {children} <Badge>{itemsCount}</Badge>
      </Headline>
      <FilterButtons
        filterList={filteredItems}
        queryKey={queryKey}
        className="my-2 xl:my-1 w-full xl:w-auto text-[11px]"
      />
    </div>
  );
};

export default TopSection;

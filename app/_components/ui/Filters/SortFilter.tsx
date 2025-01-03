"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Select from "../Form/Select";

interface SortOption {
  value: string;
  label: string;
}

interface SortFilterProps {
  options: SortOption[];
  defaultSort: string;
}

const SortFilter = ({ options, defaultSort }: SortFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = event.target.value;
    const currentParams = new URLSearchParams(searchParams?.toString() || "");

    if (selectedSort) {
      currentParams.set("sortBy", selectedSort);
    } else {
      currentParams.delete("sortBy");
    }

    router.push(`?${currentParams.toString()}`);
  };

  return (
    <div className=" border-secondary-500/20 mb-2 sm:mb-0">
      <Select
        options={options}
        handleChange={handleSortChange}
        defaultValue={defaultSort}
      />
    </div>
  );
};

export default SortFilter;

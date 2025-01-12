"use client";

import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";

const FilterSelector = ({
  filterList,
  className,
  queryKey,
}: {
  filterList: {
    id: string;
    label: string;
  }[];
  className?: string;
  queryKey: string;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value;
    const params = new URLSearchParams(searchParams?.toString());
    if (selectedCategory) {
      params.set(queryKey, selectedCategory);
    } else {
      params.delete(queryKey);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <>
      <select
        className={clsx(
          "block  text-winter-100/70 my-2 lg:my-0  px-2 py-[8px] bg-transparent border border-secondary-500/30 text-[13px]",
          className
        )}
        onChange={handleChange}
        defaultValue={searchParams?.get("category") || ""}
      >
        <option value="" className="bg-primary-900/80 text-winter-100/70">
          Sve kategorije
        </option>
        {filterList.map((item) => (
          <option
            key={item.id}
            value={item.id}
            className="bg-primary-900/80 text-winter-100/70"
          >
            {item.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default FilterSelector;

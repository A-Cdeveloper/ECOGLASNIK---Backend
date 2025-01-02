import clsx from "clsx";
import React from "react";

type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  options: Option[];
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  defaultValue: string;
  className?: string;
};

const Select = ({
  options,
  handleChange,
  defaultValue,
  className,
}: SelectProps) => {
  return (
    <select
      name="select"
      id="select"
      className={clsx(
        "block w-full md:w-auto text-winter-100/70 px-2 py-[6px] bg-transparent border border-secondary-500/30 text-[13px]",
        className
      )}
      onChange={handleChange}
      defaultValue={defaultValue}
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className="bg-primary-900/80 text-winter-100/70"
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;

import clsx from "clsx";
import React, { useState } from "react";

type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  options: Option[];
  defaultValue: string;
  className?: string;
  name: string;
  isDisabled?: boolean;
};

const Select = ({
  options,
  defaultValue,
  className,
  name,
  isDisabled,
}: SelectProps) => {
  const [selected, setSelected] = useState(defaultValue);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (isDisabled) return;
    setSelected(e.target.value);
  };

  return (
    <>
      <select
        name={name}
        className={clsx(
          "block w-full md:w-auto text-winter-100/70 px-2 py-[6px] bg-transparent border border-secondary-500/30 text-[14px]",
          className
        )}
        onChange={handleChange}
        defaultValue={selected}
        disabled={isDisabled}
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
      {/* Hidden Input to Send Value */}
      <input type="hidden" name={name} value={selected} />
    </>
  );
};

export default Select;

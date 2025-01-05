"use client";

import Checkbox from "./Checkbox";

type Organisation = {
  id: number;
  label: string;
};

type CheckboxGroupProps = {
  organisations: Organisation[];
  name: string;
  className?: string;
  defaultSelected?: number[];
};

const CheckboxGroup = ({
  organisations,
  name,
  className,
  defaultSelected,
}: CheckboxGroupProps) => {
  return (
    <div className={className}>
      {organisations.map((org) => (
        <Checkbox
          key={org.id}
          id={org.id}
          label={org.label}
          name={name}
          checked={defaultSelected?.includes(org.id) || false}
        />
      ))}
    </div>
  );
};

export default CheckboxGroup;

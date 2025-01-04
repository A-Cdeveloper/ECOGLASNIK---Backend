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
}: CheckboxGroupProps) => {
  return (
    <div className={className}>
      {organisations.map((org) => (
        <Checkbox key={org.id} id={org.id} label={org.label} name={name} />
      ))}
    </div>
  );
};

export default CheckboxGroup;

"use client";

type Organisation = {
  id: number;
  label: string;
};

type CheckboxGroupProps = {
  organisations: Organisation[];
  name: string;
  className?: string;
};

const CheckboxGroup = ({
  organisations,
  name,
  className,
}: CheckboxGroupProps) => {
  return (
    <div className={className}>
      {organisations.map((org) => (
        <label key={org.id} className="grid grid-cols-[20px,1fr] gap-2">
          <input
            type="checkbox"
            name={name} // Use the same name for all checkboxes
            value={org.id} // The value submitted when checked
            className="w-[20px] h-[20px] bg-rose-500 border-0"
          />
          <span>{org.label}</span>
        </label>
      ))}
    </div>
  );
};

export default CheckboxGroup;

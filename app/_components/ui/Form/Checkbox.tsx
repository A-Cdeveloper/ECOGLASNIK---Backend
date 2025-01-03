import React from "react";

type CheckBoxType = {
  id: number;
  label: string;
  name: string;
};

const Checkbox = ({ id, label, name }: CheckBoxType) => {
  return (
    <label key={id} className="grid grid-cols-[20px,1fr] gap-2">
      <input
        type="checkbox"
        value={id} // The value submitted when checked
        name={name}
        className="w-[20px] h-[20px] bg-rose-500 border-0"
      />
      <span>{label}</span>
    </label>
  );
};

export default Checkbox;

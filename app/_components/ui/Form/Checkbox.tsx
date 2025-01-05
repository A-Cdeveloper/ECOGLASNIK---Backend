import React, { useState } from "react";

type CheckBoxType = {
  id: number;
  label: string;
  name: string;
  checked?: boolean;
};

const Checkbox = ({ id, label, name, checked }: CheckBoxType) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  return (
    <label key={id} className="grid grid-cols-[20px,1fr] gap-2">
      <input
        type="checkbox"
        value={id}
        name={name}
        className={`appearance-none cursor-pointer w-[20px] h-[20px] bg-transparent border-1 border-secondary-500/30 ${
          isChecked ? "bg-secondary-500/70" : ""
        }`}
        checked={isChecked}
        onChange={handleChange}
        aria-checked
      />
      <span>{label}</span>
    </label>
  );
};

export default Checkbox;

"use client";

import { useState } from "react";

const ToggleSwitch = ({
  initialEnabled,
  name,
  className,
}: {
  initialEnabled: boolean;
  name: string;
  className: string;
}) => {
  const [isChecked, setIsChecked] = useState(initialEnabled);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  return (
    <label
      className={`relative inline-flex items-center cursor-pointer ${className}`}
    >
      <input
        type="checkbox"
        className="sr-only"
        checked={isChecked}
        onChange={handleChange}
        name={name}
      />
      Verifikovan korisnik:
      <div
        className={`w-[50px] h-5 flex items-center p-0 ms-1 rounded-full transition-all ${
          isChecked ? "bg-green-500" : "bg-gray-400"
        }`}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
            isChecked ? "translate-x-6" : "translate-x-0"
          }`}
        ></div>
      </div>
    </label>
  );
};

export default ToggleSwitch;

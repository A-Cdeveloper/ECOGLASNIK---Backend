"use client";

import { useState } from "react";

const InputRange = ({
  initialValue,
  name,
  className,
  min,
  max,
}: {
  initialValue: number;
  name: string;
  className?: string;
  min?: number;
  max?: number;
}) => {
  const [value, setValue] = useState(initialValue);
  return (
    <div className="flex items-center gap-2">
      <input
        type="range"
        min={min}
        max={max}
        step="1"
        className={className}
        value={value}
        name={name}
        aria-label={name}
        onChange={(e) => setValue(Number(e.target.value))}
      />
      {value}
    </div>
  );
};

export default InputRange;

"use client";
import clsx from "clsx";
import { useState } from "react";

type InputType = {
  type?: string;
  placeholder?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  ariaDescription?: string;
  required?: boolean;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({
  type,
  placeholder,
  name,
  value,
  defaultValue,
  required,
  className,
  ...rest
}: InputType) => {
  const [inputData, setInputData] = useState(defaultValue);

  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      defaultValue={inputData}
      required={required}
      onChange={(e) => setInputData(e.target.value)}
      className={clsx(
        `px-2 py-1 w-full bg-transparent border border-secondary-500/30 focus:outline-none focus:border-secondary-500 placeholder:text-winter-100/30
        ${className || ""}`
      )}
      {...rest}
    />
  );
};

export default Input;

"use client";
import clsx from "clsx";
import { useState } from "react";
import IconButton from "../Buttons/IconButton";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

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

const InputPassword = ({
  placeholder,
  name,
  value,
  defaultValue,
  required,
  className,
  ...rest
}: InputType) => {
  const [inputData, setInputData] = useState(defaultValue);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
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
      <IconButton
        icon={showPassword ? <HiEyeSlash /> : <HiEye />}
        onClick={(e) => {
          e.preventDefault();
          setShowPassword((prev) => !prev);
        }}
        className="absolute top-1/2 right-2 -translate-y-1/2"
      />
    </div>
  );
};

export default InputPassword;

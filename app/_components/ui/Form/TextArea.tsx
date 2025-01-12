"use client";
import clsx from "clsx";
import { useCallback, useState } from "react";

type TextAreaType = {
  placeholder?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  ariaDescription?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  className?: string;
};

const TextArea = ({
  placeholder,
  name,
  value,
  defaultValue,
  required,
  onChange,
  className,
  ...rest
}: TextAreaType) => {
  const [numberOfChars, setNumberOfChars] = useState(defaultValue?.length || 0);

  const onChangeTextArea = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e);
      setNumberOfChars(e.target.value.length);
    },
    [onChange]
  );

  return (
    <div className="relative">
      <textarea
        placeholder={placeholder}
        name={name}
        value={value}
        defaultValue={defaultValue}
        required={required}
        onChange={onChangeTextArea}
        className={clsx(
          `px-2 py-1 w-full h-[120px] bg-transparent border border-secondary-500/30 focus:outline-none focus:border-secondary-500 placeholder:text-winter-100/30
            ${className || ""} ${
            numberOfChars > 300 ? "border-red focus:border-red" : ""
          }`
        )}
        {...rest}
      />
      <span className="block text-white/50 absolute bottom-2 right-3 text-[12px]">
        {numberOfChars} / {300}
      </span>
    </div>
  );
};

export default TextArea;

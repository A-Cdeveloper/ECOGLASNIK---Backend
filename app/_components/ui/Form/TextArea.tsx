import { useCallback, useState } from "react";
import { TEXTAREA_MAX_CHARACTERS } from "../../constants";

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
        className={`${className} ${
          numberOfChars > TEXTAREA_MAX_CHARACTERS
            ? "border-red focus:border-red"
            : ""
        }`}
        {...rest}
      />
      <span className="block text-white/50 absolute bottom-2 right-3 text-[12px]">
        {numberOfChars} / {TEXTAREA_MAX_CHARACTERS}
      </span>
    </div>
  );
};

export default TextArea;

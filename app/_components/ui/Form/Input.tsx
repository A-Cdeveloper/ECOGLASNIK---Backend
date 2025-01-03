import clsx from "clsx";

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
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      defaultValue={defaultValue}
      required={required}
      className={clsx(
        `px-2 py-1 w-full bg-transparent border border-secondary-500/30 focus:outline-none focus:border-secondary-500 placeholder:text-winter-100/30 ${className}`
      )}
      {...rest}
    />
  );
};

export default Input;

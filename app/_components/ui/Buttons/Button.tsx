import React from "react";

export type ButtonType = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  size?: "small" | "medium" | "large" | "extrasmall"; // Use specific strings for type safety
  variation?:
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "warning"
    | "info";
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  "data-testid"?: string;
  type?: "button" | "submit" | "reset" | undefined;
};

const Button = ({
  children,
  style,
  size = "medium",
  variation = "primary",
  disabled,
  onClick,
  "data-testid": testId,
  type,
}: ButtonType) => {
  return (
    <button
      style={style}
      className={`${variation} ${size}`}
      onClick={onClick}
      disabled={!!disabled}
      data-testid={testId}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;

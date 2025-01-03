export type ButtonIconType = {
  icon: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onMouseOver?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  className?: string;
};

const IconButton = ({
  icon,
  onClick,
  onMouseOver,
  type,
  className,
}: ButtonIconType) => {
  return (
    <button
      type={type}
      onClick={onClick}
      onMouseOver={onMouseOver}
      className={`p-0 ${className}`}
    >
      <span className="text-[18px]">{icon}</span>
    </button>
  );
};

export default IconButton;

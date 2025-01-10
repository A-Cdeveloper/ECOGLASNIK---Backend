import { IconType } from "react-icons";

type DynamicIconProps = {
  Icon: IconType;
  color?: string;
  className?: string;
};

const DynamicIcon = ({ Icon, className = "" }: DynamicIconProps) => {
  return <Icon className={`text-[20px] ${className}`} />;
};

export default DynamicIcon;

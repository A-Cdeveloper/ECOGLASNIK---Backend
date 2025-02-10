import clsx from "clsx";

type HeadlineProps = {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
};

const Headline = ({ level = 1, children, className = "" }: HeadlineProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  const generalClasses =
    "font-semibold leading-[1.25] mb-1 text-wrap text-winter-100 uppercase";
  let fontSizeClasses = "";

  switch (level) {
    case 1:
      fontSizeClasses = `text-xl md:text-xl lg:text-xl `;
      break;

    case 2:
      fontSizeClasses = "text-lg md:text-xl lg:text-xl";
      break;

    case 3:
      fontSizeClasses = "text-lg md:text-lg lg:text-lg";
      break;

    case 4:
      fontSizeClasses = "text-[16px] md:text-md lg:text-base";
      break;
  }

  return (
    <Tag className={clsx(`${fontSizeClasses} ${generalClasses} ${className}`)}>
      {children}
    </Tag>
  );
};

export default Headline;

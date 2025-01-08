import SortFilter from "@/app/_components/ui/Filters/SortFilter";
import Link from "next/link";

const PageTopbar = ({
  sortOptions,
  defaultSort,
  children,
  linkToNew,
}: {
  sortOptions: { value: string; label: string }[];
  defaultSort: string;
  children?: React.ReactNode;
  linkToNew?: string;
}) => {
  return (
    <>
      <div className="flex flex-wrap justify-center md:justify-between items-center mt-6 w-full 2xl:w-3/4">
        <SortFilter options={sortOptions} defaultSort={defaultSort} />
        {linkToNew && (
          <Link href={linkToNew} className="button info small mt-2 md:mt-0">
            {children}
          </Link>
        )}
      </div>
    </>
  );
};

export default PageTopbar;

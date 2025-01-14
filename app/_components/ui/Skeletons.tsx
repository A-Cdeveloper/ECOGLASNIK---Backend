import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const SkeletonTopBar = () => {
  return (
    <div className="flex flex-wrap justify-start sm:justify-between items-center mt-6 w-full 2xl:w-3/4">
      <div className="w-auto">
        <Skeleton
          width={120}
          height={20}
          baseColor="gray"
          className="opacity-40"
        />
      </div>
      <div className="flex flex-wrap justify-start 4xl:justify-end items-center gap-x-3 w-full 3xl:w-auto">
        <Skeleton
          width={80}
          height={20}
          baseColor="gray"
          className="opacity-40"
        />
      </div>
    </div>
  );
};

export const SkeletonPagination = () => (
  <div className="flex gap-x-2 justify-end items-center  mt-4 w-full lg:w-3/4 self-center">
    <Skeleton
      width={250}
      height={12}
      baseColor="gray"
      className="opacity-40 mt-5"
    />
  </div>
);

export const SkeletonTable = ({ cellNumber = 5 }: { cellNumber?: number }) => (
  <div className="overflow-x-auto">
    <table className="table-auto border-collapse w-full 2xl:w-3/4  mt-3">
      <tbody>
        <tr>
          {Array.from({ length: cellNumber }).map((_, colIndex) => (
            <td key={colIndex} className="block md:table-cell px-2">
              <Skeleton
                height={8}
                baseColor="gray"
                className="opacity-40 w-full"
                count={5}
              />
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  </div>
);

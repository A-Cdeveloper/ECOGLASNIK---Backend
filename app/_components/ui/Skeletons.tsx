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

export const SkeletonTopSection = () => {
  return (
    <div className="flex flex-wrap justify-between items-center border-y border-secondary-100/20 px-0 py-2">
      <Skeleton
        width={120}
        height={20}
        baseColor="gray"
        className="opacity-40"
      />
      <Skeleton
        width={80}
        height={20}
        baseColor="gray"
        className="opacity-40"
      />
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
    <table className="table-auto border-collapse w-full 2xl:w-3/4">
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

export const SkeletonGeneralStats = ({
  boxNumber = 4,
}: {
  boxNumber?: number;
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-[1fr_1fr_1fr_1fr] my-8 gap-2 w-full 2xl:w-[60%] ">
      {Array.from({ length: boxNumber }).map((_, colIndex) => {
        return (
          <>
            <Skeleton
              key={colIndex}
              height={60}
              baseColor="gray"
              className="opacity-40 w-full"
              count={1}
            />
          </>
        );
      })}
    </div>
  );
};

export const PieSkeleton = ({ statNumber }: { statNumber: number }) => {
  return (
    <div className="flex flex-wrap md:flex-nowrap items-center justify-center ">
      {/* Pie Chart Container */}
      <div className="w-full md:w-1/2 text-center">
        <Skeleton
          height={180}
          width={180}
          baseColor="gray"
          className="opacity-40"
          count={1}
          circle
        />
      </div>

      {/* Legend Container (Manually Placed) */}
      <div className="w-full md:w-1/2 py-2 h-[300]">
        {Array.from({ length: statNumber }).map((_, colIndex) => (
          <>
            <Skeleton
              key={colIndex}
              height={8}
              baseColor="gray"
              className="opacity-40 w-full"
              count={1}
            />
          </>
        ))}
      </div>
    </div>
  );
};

export const BarChartSkeleton = () => {
  return (
    <div className="flex items-end space-x-2 w-full h-[200px]">
      {Array.from({ length: 20 }).map((_, index) => (
        <div key={index} className="flex flex-col items-center">
          <Skeleton
            height={Math.random() * 60 + 100}
            width={30}
            baseColor="gray"
            className="opacity-40"
          />
          <Skeleton
            width={30}
            height={5}
            style={{ marginTop: 5 }}
            baseColor="gray"
            className="opacity-40"
          />
        </div>
      ))}
    </div>
  );
};

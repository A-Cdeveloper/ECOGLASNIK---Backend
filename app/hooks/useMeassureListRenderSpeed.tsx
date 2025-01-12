import { useEffect, useState } from "react";

const useMeasureListRenderSpeed = <T,>(list: T[]): number | null => {
  const [renderTime, setRenderTime] = useState<number | null>(null);

  useEffect(() => {
    if (list && list.length > 0) {
      const startTime = performance.now();

      // Ensure timing is measured after rendering is complete
      setTimeout(() => {
        const endTime = performance.now();
        setRenderTime((endTime - startTime) / 1000);
      }, 0);
    }
  }, [list]);

  return renderTime;
};

export default useMeasureListRenderSpeed;

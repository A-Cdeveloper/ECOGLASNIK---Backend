"use client";
import { useEffect, useRef } from "react";

const useOutsideClick = (fn: () => void, listenCapturing = true) => {
  const refEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function closeHandler(e: MouseEvent) {
      if (refEl.current && !refEl.current.contains(e.target as Node)) {
        fn();
      }
    }

    document.addEventListener("click", closeHandler, listenCapturing);
    return () => {
      document.removeEventListener("click", closeHandler, listenCapturing);
    };
  }, [fn, listenCapturing]);

  return { refEl };
};

export default useOutsideClick;

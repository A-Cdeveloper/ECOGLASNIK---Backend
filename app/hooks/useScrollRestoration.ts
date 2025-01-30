import { useEffect } from "react";

const useScrollRestoration = (disable: boolean) => {
  useEffect(() => {
    if (disable) {
      // Manually set scroll restoration to 'manual' by capturing scroll position
      window.history.scrollRestoration = "manual";
    } else {
      // Re-enable the default scroll restoration
      window.history.scrollRestoration = "auto";
    }
  }, [disable]);
};

export default useScrollRestoration;

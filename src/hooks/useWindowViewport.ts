import { useLayoutEffect, useState } from "react";
import { EViewportBreakpoints } from "../enums/viewport-breakpoints.enum";
import { EViewportNames } from "../enums/viewport-names.enum";

const useWindowViewport = () => {
  const getWindowSize = () => {
    if (
      window.matchMedia(`(max-width: ${EViewportBreakpoints.MOBILE}px)`).matches
    ) {
      return EViewportNames.MOBILE;
    }
    if (
      window.matchMedia(
        `(min-width: ${EViewportBreakpoints.MOBILE + 1}px) and (max-width: ${
          EViewportBreakpoints.TABLET - 1
        }px)`
      ).matches
    ) {
      return EViewportNames.TABLET;
    }

    return EViewportNames.DESKTOP;
  };
  const [windowSize, setWindowSize] = useState(
    getWindowSize() as EViewportNames
  );

  const handleResize = () => {
    setWindowSize(getWindowSize());
  };

  useLayoutEffect(() => {
    getWindowSize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export default useWindowViewport;

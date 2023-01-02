import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { isTablet, isMobile } from "react-device-detect";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const isDesktop = useMediaQuery({
    query: "(min-width: 950px)",
  });
  const isPortrait = useMediaQuery({
    query: "(orientation: portrait)",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isPortrait]);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const shouldRenderMobile =
    !isDesktop ||
    (isTablet && isPortrait) ||
    (isMobile && !isTablet && isPortrait);

  return {
    windowDimensions,
    isDesktop,
    isTablet,
    isMobile,
    isPortrait,
    shouldRenderMobile,
  };
}

import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const reset = () => {
      window.scrollTo(0, 0);
      const container = document.querySelector(".app-scroll-container");
      if (container) {
        container.scrollTop = 0;
      }
    };
    
    reset();
    const timer = setTimeout(reset, 50);
    
    // Lenis scroll if available
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    }
    
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};

export default ScrollToTop;

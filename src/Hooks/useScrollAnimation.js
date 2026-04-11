// useScrollAnimation.js
import { useEffect } from "react";
import { useLocation } from "react-router";

const useScrollAnimation = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-up");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      {
        threshold: 0.1,
      },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]);
};

export default useScrollAnimation;

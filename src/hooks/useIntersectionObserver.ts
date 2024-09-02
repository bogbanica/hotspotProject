import { useEffect, useRef } from "react";

const useIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  }
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const setObservedTargets = (targets: Element[]) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(callback, options);
    targets.forEach((target) => observerRef.current?.observe(target));
  };

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return setObservedTargets;
};

export default useIntersectionObserver;

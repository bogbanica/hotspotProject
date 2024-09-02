import { useCallback, useEffect } from "react";
import HotspotContainer from "./pages/furnitureStore/HotspotContainer";
import useIntersectionObserver from "./hooks/useIntersectionObserver";
import useProductsData from "./hooks/useProductsData";

declare global {
  interface Window {
    initHotspots: (element: HTMLElement) => void;
  }
}

const App = () => {
  const [products] = useProductsData();

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const container = entry.target as HTMLElement;
          window.initHotspots(container);
        }
      });
    },
    []
  );

  const setObservedTargets = useIntersectionObserver(observerCallback);

  useEffect(() => {
    const productIds = products.map((product) => product.id);
    const selector = productIds.map((id) => `#${id}`).join(",");

    if (!selector) return;

    const elementsToObserve = document.querySelectorAll(selector);
    setObservedTargets(Array.from(elementsToObserve));
  }, [setObservedTargets, products]);

  return (
    <>
      {products.map((product) => (
        <HotspotContainer
          key={product.id}
          productId={product.id}
          products={products}
        />
      ))}
    </>
  );
};

export default App;

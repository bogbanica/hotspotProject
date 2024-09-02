import { Box, CircularProgress } from "@mui/material";
import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Product } from "../../models";

const HotspotImage = lazy(
  () => import("../../components/furnitureStore/HotspotImage")
);
interface HotspotContainerProps {
  productId: string;
  products: Product[];
}

export default function HotspotContainer({
  productId,
  products,
}: HotspotContainerProps) {
  const [initializedHotspots, setInitializedHotspots] = useState<Set<string>>(
    new Set()
  );

  const initHotspots = useCallback(
    async (element: HTMLElement) => {
      const containerId = element.id;
      if (initializedHotspots.has(containerId)) return;

      const product = products.find((product) => product.id === containerId);
      if (!product) return;

      const hotspotByClassName = {
        ...product,
        hotspots: product.hotspots.filter(
          (hotspot) => hotspot.className === element.className
        ),
      };

      const root = ReactDOM.createRoot(element);

      root.render(
        <Suspense
          fallback={
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <CircularProgress />
            </Box>
          }
        >
          <HotspotImage product={hotspotByClassName} />
        </Suspense>
      );
      setInitializedHotspots((prev) => new Set(prev).add(containerId));
    },
    [products, initializedHotspots]
  );

  useEffect(() => {
    window.initHotspots = initHotspots;
  }, [initHotspots]);

  return (
    <div
      id={productId}
      className="hotspot"
      style={{ width: "100%", height: "100vh", margin: "50px 0px" }}
    ></div>
  );
}

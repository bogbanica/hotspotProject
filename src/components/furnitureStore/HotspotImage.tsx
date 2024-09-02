import { Box } from "@mui/material";
import HotspotCircle from "./Hotspot";
import { Product } from "../../models";

interface HotspotProps {
  product: Product;
}

export default function HotspotImage({ product }: HotspotProps) {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        mb: 20,
      }}
    >
      <img src={product.src} alt="ProductImage" />
      {product.hotspots.map((hotspot, index) => (
        <HotspotCircle key={index} hotspot={hotspot} />
      ))}
    </Box>
  );
}

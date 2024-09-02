import {
  Box,
  Button,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { Hotspot } from "../../models";
import { ColorPalette } from "../../styles";

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
    maxWidth: 300,
  },
}));

const makeStyles = (tooltipOpen: boolean) => ({
  circle: {
    position: "absolute",
    width: "40px",
    height: "40px",
    backgroundColor: tooltipOpen
      ? ColorPalette.PURE_WHITE
      : ColorPalette.LIGHT_RED,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "none",
    zIndex: 3,
    cursor: "pointer",
  },
  dot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    backgroundColor: tooltipOpen
      ? ColorPalette.DARK_RED
      : ColorPalette.PURE_WHITE,
  },
});

interface HotspotCircleProps {
  hotspot: Hotspot;
}

export default function HotspotCircle({ hotspot }: HotspotCircleProps) {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const styles = makeStyles(tooltipOpen);
  const navigateToCart = () => {
    window.location.href = hotspot.product.addToCartLink;
  };

  const navigateToProductDetails = () => {
    window.location.href = hotspot.product.detailsLink;
  };

  return (
    <LightTooltip
      title={
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          sx={{ my: 2 }}
        >
          <Box flex={1}>
            <img
              src={hotspot.product.img}
              alt={hotspot.product.name}
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
          <Box flex={2} ml={2}>
            <Typography
              sx={{ fontWeight: 600, color: ColorPalette.LIGHT_GREY }}
            >
              {hotspot.product.name}
            </Typography>

            <Typography
              sx={{ fontWeight: 500, color: ColorPalette.LIGHT_GREY }}
            >
              {hotspot.product.description}
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: 500, m: "16px 0" }}>
              {hotspot.product.price}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: ColorPalette.ORANGE, width: "100%" }}
              onClick={navigateToCart}
            >
              Add to cart
            </Button>
            <Button
              variant="outlined"
              color="primary"
              style={{ width: "100%", marginTop: 8 }}
              onClick={navigateToProductDetails}
            >
              More details
            </Button>
          </Box>
        </Box>
      }
      onOpen={() => setTooltipOpen(true)}
      onClose={() => setTooltipOpen(false)}
    >
      <Box
        sx={{
          ...styles.circle,
          top: `${hotspot.top}%`,
          left: `${hotspot.left}%`,
        }}
      >
        <Box sx={styles.dot} />
      </Box>
    </LightTooltip>
  );
}

export interface Product {
  id: string;
  src: string;
  hotspots: Hotspot[];
}
export interface Hotspot {
  className: string;
  top: string;
  left: string;
  product: ProductDetails;
}

export interface ProductDetails {
  img: string;
  name: string;
  price: string;
  description: string;
  addToCartLink: string;
  detailsLink: string;
}

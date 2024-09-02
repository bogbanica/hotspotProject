import { useEffect, useState } from "react";
import { Identifier, Product } from "../models";
import { toast } from "react-toastify";

export default function useProductsData(): [
  products: Product[] | [],
  isLoading: boolean
] {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const productsElement = document.getElementById(Identifier.productsElement);

    if (productsElement) {
      try {
        setProducts(JSON.parse(productsElement.textContent || "[]"));
      } catch (error) {
        toast.error("Error while parsing hotspots data");
        console.log(error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  return [products, isLoading];
}

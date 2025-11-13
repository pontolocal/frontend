import { useState } from "react";
import ProductServices from "../services/ProductServices";
import type { Product } from "../types/Product";

export const useProduct = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  const api = new ProductServices();
  const fetchProducts = async (endpoint: string) => {
    try {
      setIsLoading(true);
      const response = await api.getProducts(endpoint);
      console.log("response", response)
      setProducts(response);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Erro ao carregar os produtos");
    } finally {
      setIsLoading(false);
    }
  }

  return { products, fetchProducts, isLoading, errorMessage };
};

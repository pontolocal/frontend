import { useCallback, useEffect, useState } from "react";
import ProductServices from "../services/ProductServices";
import type { ProductType } from "../models/Products";

export const useProduct = (endpoint: string) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<ProductType[]>();

  const api = new ProductServices();
  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.getProducts(endpoint);
      setProducts(response);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Erro ao carregar os produtos");
    } finally {
      setIsLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, fetchProducts, isLoading, errorMessage };
};

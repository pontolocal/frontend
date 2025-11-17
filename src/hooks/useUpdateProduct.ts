import { useState } from "react";
import ProductServices from "../services/ProductServices";
import type { Product } from "../types/Product";

export const useUpdateProduct = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [productUpdated, setProductUpdated] = useState<Product>();

  const api = new ProductServices();
  const fetchUpdateProducts = async (endpoint : string, request : Product) => {
    try {
      setIsLoading(true);
      const response : Product = await api.updateProduct(endpoint, request);
      setProductUpdated(response);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Erro ao carregar os produtos");
      throw error
    } finally {
      setIsLoading(false);
    }
  }

  return { productUpdated, fetchUpdateProducts, isLoading, errorMessage };
};
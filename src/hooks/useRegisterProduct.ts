import { useState } from "react";
import ProductServices from "../services/ProductServices";
import type { Product } from "../types/Product";

export const useRegisterProduct = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [productCreated, setProductCreated] = useState<Product>();

  const api = new ProductServices();
  const fetchRegisterProducts = async (endpoint : string, request : Product) => {
    try {
      setIsLoading(true);
      const response = await api.createProduct(endpoint, request);
      setProductCreated(response);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Erro ao carregar os produtos");
    } finally {
      setIsLoading(false);
    }
  }

  return { productCreated, fetchRegisterProducts, isLoading, errorMessage };
};
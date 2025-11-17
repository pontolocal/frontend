import { useState } from "react";
import ProductServices from "../services/ProductServices";

export const useDeleteProduct = () => {
  const [errorMessage, setErrorMessage] = useState(
    "erro: não foi possível fazer a requisição."
  );
  const [isLoading, setIsLoading] = useState(false);

  const api = new ProductServices();

  const fetchDeleteProduct = async (endpoint : string) => {
    try {
      setIsLoading(true);
      await api.deleteProduct(endpoint);
      setErrorMessage("");
    } catch (error: any) {
      if (error.response?.data?.message) {
        setErrorMessage(
          `Erro ao deletar produto: ${error.response.data.message}`
        );
      } else if (error.message) {
        setErrorMessage(`Erro ao deletar produto: ${error.message}`);
      } else {
        setErrorMessage("Erro ao deletar produto:");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchDeleteProduct, isLoading, errorMessage };
};
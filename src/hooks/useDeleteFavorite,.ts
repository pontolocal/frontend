import { useState } from "react";
import FavoriteServices from "../services/FavoriteServices";

export const useDeleteFavorite = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState();

  const api = new FavoriteServices();
  const fetchDeleteFavorite = async (endpoint: string) => {
    try {
      setIsLoading(true);
      const response = await api.deleteFavorite(endpoint);
      setSuccessMessage(response);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Erro ao carregar favoritos");
    } finally {
      setIsLoading(false);
    }
  }

  return { successMessage, fetchDeleteFavorite, isLoading, errorMessage };
};

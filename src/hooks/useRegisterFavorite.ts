import { useState } from "react";
import FavoriteServices from "../services/FavoriteServices";

export const useRegisterFavorite = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState();

  const api = new FavoriteServices();
  const fetchFavorites = async (endpoint : string) => {
    try {
      setIsLoading(true);
      const response = await api.createFavorite(endpoint);
      setFavorites(response);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Erro ao carregar favoritos");
      throw error
    } finally {
      setIsLoading(false);
    }
  }

  return { favorites, fetchFavorites, isLoading, errorMessage };
};

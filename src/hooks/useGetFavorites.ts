import { useCallback, useEffect, useState } from "react";
import FavoriteServices from "../services/FavoriteServices";

export const useGetFavorites = (endpoint: string) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  const api = new FavoriteServices();
  const fetchFavorites = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.getFavorites(endpoint);
      setFavorites(response);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Erro ao carregar favoritos");
    } finally {
      setIsLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return { favorites, fetchFavorites, isLoading, errorMessage };
};

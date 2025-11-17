import { useCallback, useEffect, useState } from "react";
import FavoriteServices from "../services/FavoriteServices";
import { transformProducts } from "../utils/formaJsonResponse";

export const useGetFavorites = (endpoint: string) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  const api = new FavoriteServices();
  const fetchFavorites = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.getFavorites(endpoint);
      const favoritesFormatted : any = transformProducts(response);
      console.log("favoritos", favoritesFormatted)
      setFavorites(favoritesFormatted);
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

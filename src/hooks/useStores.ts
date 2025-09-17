import { useCallback, useEffect, useState } from "react";
import StoreServices from "../services/StoreServices";
import type StoresType from "../models/Stores";

export const useStores = (endpoint: string) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [stores, setStores] = useState<StoresType[]>();

  const api = new StoreServices();
  const fetchStores = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.getStores(endpoint);
      setStores(response);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Erro ao carregar lojas");
    } finally {
      setIsLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  return { stores, fetchStores, isLoading, errorMessage };
};

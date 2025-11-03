import { useCallback, useState } from "react";

import type { UserRegisterRequest } from "../models/User";
import { UserServices } from "../services/UserService";

export const useUser = (endpoint: string) => {
  const [errorMessage, setErrorMessage] = useState(
    "erro: não foi possível fazer a requisição."
  );
  const [isLoading, setIsLoading] = useState(false);
  const [user, setuser]: any = useState();

  const api = new UserServices();

  const fetchUser = useCallback(
    async (request: UserRegisterRequest) => {
      try {
        setIsLoading(true);
        const response: any = await api.registerUser(endpoint, request);
        setuser(response);
        setErrorMessage("");
      } catch (error: any) {
        if (error.response?.data?.message) {
          setErrorMessage(
            `Erro ao cadastrar usuário: ${error.response.data.message}`
          );
        } else if (error.message) {
          setErrorMessage(`Erro ao cadastrar usuário: ${error.message}`);
        } else {
          setErrorMessage("Erro ao cadastrar usuário");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [endpoint]
  );

  return { user, fetchUser, isLoading, errorMessage };
};

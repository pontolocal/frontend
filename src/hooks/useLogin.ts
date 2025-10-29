import { useCallback, useState } from "react";

import type { LoginRequest } from "../models/User";
import { UserServices } from "../services/UserService";

export const useLogin = (endpoint: string) => {
  const [errorMessage, setErrorMessage] = useState(
    "erro: não foi possível fazer a requisição."
  );
  const [isLoading, setIsLoading] = useState(false);
  const [login, setLogin]: any = useState();

  const api = new UserServices();

  const fetchLogin = useCallback(
    async (request: LoginRequest) => {
      try {
        setIsLoading(true);
        const response: any = await api.loginUser(endpoint, request);
        setLogin(response);
        setErrorMessage("");
      } catch (error: any) {
        if (error.response?.data?.message) {
          setErrorMessage(
            `Erro ao logar usuário: ${error.response.data.message}`
          );
        } else if (error.message) {
          setErrorMessage(`Erro ao logar usuário: ${error.message}`);
        } else {
          setErrorMessage("Erro ao logar usuário");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [endpoint]
  );

  return { login, fetchLogin, isLoading, errorMessage };
};

import { useCallback, useState } from "react";

import type { UserUpdateRequest } from "../models/User";
import { UserServices } from "../services/UserService";

export const useUpdateUser = (endpoint: string) => {
  const [errorMessage, setErrorMessage] = useState(
    "erro: não foi possível fazer a requisição."
  );
  const [isLoading, setIsLoading] = useState(false);
  const [userUpdated, setuserUpdated]: any = useState();

  const api = new UserServices();

  const fetchUpdateUser = useCallback(
    async (request: UserUpdateRequest) => {
      try {
        setIsLoading(true);
        const response: any = await api.updateUser(endpoint, request);
        setuserUpdated(response);
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

  return { userUpdated, fetchUpdateUser, isLoading, errorMessage };
};

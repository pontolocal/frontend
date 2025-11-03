import { useCallback, useState } from "react";
import { UserServices } from "../services/UserService";

export const useDeleteUser = (endpoint: string) => {
  const [errorMessage, setErrorMessage] = useState(
    "erro: não foi possível fazer a requisição."
  );
  const [isLoading, setIsLoading] = useState(false);

  const api = new UserServices();

  const fetchDeleteUser = useCallback(async () => {
    try {
      setIsLoading(true);
      await api.deleteUser(endpoint);
      setErrorMessage("");
    } catch (error: any) {
      if (error.response?.data?.message) {
        setErrorMessage(
          `Erro ao deletar usuário: ${error.response.data.message}`
        );
      } else if (error.message) {
        setErrorMessage(`Erro ao deletar usuário: ${error.message}`);
      } else {
        setErrorMessage("Erro ao deletar usuário:");
      }
    } finally {
      setIsLoading(false);
    }
  }, [endpoint]);

    //   useEffect(() => {
    //   fetchDeleteUser();
    // }, [fetchDeleteUser]);

  return { fetchDeleteUser, isLoading, errorMessage };
};

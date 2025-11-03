import { useCallback, useState } from "react";
import { UserServices } from "../services/UserService";

export const useGetUser = (endpoint: string) => {
  const [errorMessage, setErrorMessage] = useState(
    "erro: não foi possível fazer a requisição."
  );
  const [isLoading, setIsLoading] = useState(false);
  const [user, setuser]: any = useState();

  const api = new UserServices();

  const fetchGetUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const response: any = await api.getUser(endpoint);
      setuser(response);
      setErrorMessage("");
    } catch (error: any) {
      if (error.response?.data?.message) {
        setErrorMessage(
          `Erro ao extrair dados do usuário: ${error.response.data.message}`
        );
      } else if (error.message) {
        setErrorMessage(`Erro ao extrair dados do usuário: ${error.message}`);
      } else {
        setErrorMessage("Erro ao extrair dados do usuário:");
      }
    } finally {
      setIsLoading(false);
    }
  }, [endpoint]);

  // useEffect(() => {
  //   fetchGetUser();
  // }, [fetchGetUser]);

  return { user, fetchGetUser, isLoading, errorMessage };
};

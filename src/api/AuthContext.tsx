import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import type { ReactNode } from "react";

type AuthContextType = {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isTokenValid: boolean;
};

type JWTPayload = {
  exp: number;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );
  const [isTokenValid, setIsTokenValid] = useState<boolean>(false);

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsTokenValid(false);
  };

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode<JWTPayload>(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp > currentTime) {
          setIsTokenValid(true);
        } else {
          logout();
        }
      } catch (error) {
        console.error("Token inválido:", error);
        logout();
      }
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, login, logout, isTokenValid }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return context;
};

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

type GlobalContextType = {
  themeMode: string;
  setThemeMode: (value: string) => void;
  userId: number | null;
  userInfos: GoogleJwtPayload | null;
};

type GoogleJwtPayload = {
  name: string;
  email: string;
  picture: string;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [themeMode, setThemeMode] = useState("light");
  const [userId, setUserId] = useState<number | null>(null);
  const [userInfos, setUserInfos] = useState<GoogleJwtPayload | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode<any>(token);

      if (decoded.name && decoded.email) {
        setUserInfos({
          name: decoded.name,
          email: decoded.email,
          picture: decoded.picture,
        });
        console.log("dados do usuario", {
          name: decoded.name,
          email: decoded.email,
          picture: decoded.picture,
        })
      } else {
        const id = Number(decoded.id ?? decoded.userId ?? decoded.sub ?? null);
        setUserId(isNaN(id) ? null : id);
      }
    } catch (err) {
      console.error("Token inválido:", err);
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        themeMode,
        setThemeMode,
        userId,
        userInfos,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error("useGlobal deve ser usado dentro de GlobalProvider");
  return context;
};

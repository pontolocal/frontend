import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

type GlobalContextType = {
  themeMode: string;
  setThemeMode: (value: string) => void;
  userId: number | null;
  userInfos: GoogleJwtPayload | null;
  setUserId: any;
};

type GoogleJwtPayload = {
  name: string;
  email: string;
  picture: string;
};

export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [themeMode, setThemeMode] = useState(localStorage.getItem("theme") || "light");
  const [userId, setUserId] = useState<number | null>(Number(localStorage.getItem("userId")) || null);
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
        });
      } else {
        const storageId = localStorage.getItem("userId");
        setUserId(Number(storageId));
      }
    } catch (err) {
      console.error("Token inválido:", err);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", themeMode)
  }, [themeMode])

  return (
    <GlobalContext.Provider
      value={{
        themeMode,
        setThemeMode,
        userId,
        userInfos,
        setUserId,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

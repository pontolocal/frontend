import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type GlobalContextType = {
  themeMode: string;
  setThemeMode: (value: string) => void;
};

const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [themeMode, setThemeMode] = useState("light");

  return (
    <GlobalContext.Provider
      value={{
        themeMode,
        setThemeMode,
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

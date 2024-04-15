/* eslint-disable react-refresh/only-export-components */
import { Theme } from "@/interfaces";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextProps {
  theme: Theme;
  handleToggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");

  const handleToggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  useEffect(() => {
    document.body.classList.add(theme);
    document.body.classList.remove(theme === "dark" ? "light" : "dark");
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        handleToggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (typeof context === "undefined") {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

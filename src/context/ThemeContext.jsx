import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  theme: "dark",
  setTheme: () => null,
  toggleTheme: () => null,
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  // Initialize theme from localStorage or default to dark
  useEffect(() => {
    // Run only on client-side
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      // Use stored theme if available, otherwise default to dark
      if (storedTheme) {
        setTheme(storedTheme);
      } else {
        // Default to dark mode, ignore system preference
        setTheme("dark");
        localStorage.setItem("theme", "dark");
      }
    }
  }, []);

  // Update document when theme changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;

import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  theme: "light",
  setTheme: () => null,
  toggleTheme: () => null,
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  // Initialize theme from localStorage or default to light
  useEffect(() => {
    // Run only on client-side
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      // Use stored theme if available, otherwise default to light
      if (storedTheme) {
        setTheme(storedTheme);
      } else {
        // Default to light mode, ignore system preference
        setTheme("light");
        localStorage.setItem("theme", "light");
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

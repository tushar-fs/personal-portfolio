import React from "react";
import { motion } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "@/context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      className={`p-2 rounded-full ${
        isDark ? "bg-primary/10" : "bg-primary/10"
      } transition-colors`}
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="text-lg"
      >
        {isDark ? (
          <FiSun className="text-[#ffd700]" /> // Gold color for sun
        ) : (
          <FiMoon className="text-primary" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;

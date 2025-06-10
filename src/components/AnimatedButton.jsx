import React from "react";
import { motion } from "framer-motion";

export default function AnimatedButton({
  children,
  className = "",
  color = "primary",
  ...props
}) {
  const colorClasses =
    color === "primary"
      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
      : "bg-muted hover:bg-muted/80 text-muted-foreground border border-border";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-6 py-2 rounded-lg font-bold shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary ${colorClasses} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}

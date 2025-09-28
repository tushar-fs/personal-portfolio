import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FaHome,
  FaBriefcase,
  FaLaptopCode,
  FaGraduationCap,
  FaTools,
  FaFileAlt,
  FaEnvelope,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "@/context/ThemeContext";
import { FaTrophy } from "react-icons/fa";
import resume from "@/data/resume.json";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: <FaHome /> },
  { href: "/projects", label: "Projects", icon: <FaLaptopCode /> },
  { href: "/activities", label: "Achievements", icon: <FaTrophy /> },
  { href: "/experience", label: "Experience", icon: <FaBriefcase /> },
  { href: "/skills", label: "Skills", icon: <FaTools /> },
  { href: "/education", label: "Education", icon: <FaGraduationCap /> },
  { href: "/resume", label: "Resume", icon: <FaFileAlt /> },
  { href: "/contact", label: "Contact", icon: <FaEnvelope /> },
];

const navVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120, damping: 20 },
  },
};

export default function Navbar() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle menu toggle
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Close menu when route changes
  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [router.pathname]);

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50"
    >
      <div className="bg-muted/50 backdrop-blur-sm border border-border rounded-xl shadow-lg px-4 py-2 flex items-center justify-between">
        <Link href="/" passHref legacyBehavior>
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-2 items-center">
          {NAV_ITEMS.map((item) => {
            const isActive = router.pathname === item.href;
            return (
              <li key={item.href}>
                <Link href={item.href} passHref legacyBehavior>
                  <motion.a
                    className={`relative px-3 py-2 rounded-md text-sm font-bold flex items-center gap-1.5 ${
                      isActive ? "text-white" : "text-muted-foreground"
                    }`}
                    initial={{ backgroundColor: "rgba(0,0,0,0)" }}
                    animate={{
                      backgroundColor: isActive ? "" : "rgba(0,0,0,0)",
                      color: isActive ? "" : "",
                      transition: { duration: 0.3 },
                    }}
                    whileHover={
                      !isActive
                        ? {
                            scale: 1.05,
                            backgroundColor: isDark
                              ? "rgba(129, 140, 248, 0.1)"
                              : "rgba(99, 102, 241, 0.1)",
                            color: isDark ? "#f7f8fa" : "#18181b",
                            transition: {
                              scale: { duration: 0.3, ease: "easeOut" },
                              backgroundColor: {
                                duration: 0.3,
                                ease: "easeOut",
                              },
                              color: { duration: 0.3, ease: "easeOut" },
                            },
                          }
                        : {}
                    }
                    whileTap={!isActive ? { scale: 0.95 } : {}}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="underline"
                        className="absolute inset-0 bg-primary rounded-md z-[-1]"
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                    )}
                    <motion.span
                      className="text-[0.85em]"
                      whileHover={{
                        rotate: !isActive ? [0, -10, 10, -5, 0] : 0,
                      }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      {item.icon}
                    </motion.span>
                    {item.label}
                  </motion.a>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex gap-4 items-center text-xl text-muted-foreground">
          <ThemeToggle />

          {/* Mobile menu button */}
          <motion.button
            className="block md:hidden text-xl"
            onClick={toggleMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-2 bg-muted/95 backdrop-blur-sm border border-border rounded-xl shadow-lg overflow-hidden"
          >
            <ul className="py-2 px-4">
              {NAV_ITEMS.map((item) => {
                const isActive = router.pathname === item.href;
                return (
                  <li key={item.href} className="my-1">
                    <Link href={item.href} passHref>
                      <motion.div
                        className={`flex items-center gap-3 px-3 py-3 rounded-md text-sm font-bold ${
                          isActive
                            ? "bg-primary text-white"
                            : "text-muted-foreground hover:bg-primary/10"
                        }`}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="text-lg">{item.icon}</span>
                        {item.label}
                      </motion.div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FaGithub,
  FaLinkedin,
  FaHome,
  FaBriefcase,
  FaLaptopCode,
  FaGraduationCap,
  FaTools,
  FaFileAlt,
  FaEnvelope,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "@/context/ThemeContext";
import resume from "@/data/resume.json";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: <FaHome /> },
  { href: "/skills", label: "Skills", icon: <FaTools /> },
  { href: "/experience", label: "Experience", icon: <FaBriefcase /> },
  { href: "/projects", label: "Projects", icon: <FaLaptopCode /> },
  { href: "/education", label: "Education", icon: <FaGraduationCap /> },
  { href: "/resume", label: "Resume", icon: <FaFileAlt /> },
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

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-4xl z-50"
    >
      <div className="bg-muted/50 backdrop-blur-sm border border-border rounded-xl shadow-lg px-4 py-2 flex items-center justify-between">
        <Link href="/" passHref legacyBehavior>
          <Logo />
        </Link>

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
          <motion.a
            href={resume.home.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.1,
              color: isDark ? "#818cf8" : "#6366f1",
              transition: {
                scale: { duration: 0.3, ease: "easeOut" },
                color: { duration: 0.3, ease: "easeOut" },
              },
            }}
            whileTap={{ scale: 0.95 }}
            className="transition-all duration-300"
          >
            <FaGithub />
          </motion.a>
          <motion.a
            href={resume.home.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.1,
              color: isDark ? "#818cf8" : "#6366f1",
              transition: {
                scale: { duration: 0.3, ease: "easeOut" },
                color: { duration: 0.3, ease: "easeOut" },
              },
            }}
            whileTap={{ scale: 0.95 }}
            className="transition-all duration-300"
          >
            <FaLinkedin />
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
}

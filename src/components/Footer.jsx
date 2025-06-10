import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";
import { motion } from "framer-motion";
import resume from "@/data/resume.json";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const router = useRouter();
  const isHomePage = router.pathname === "/";
  const isContactPage = router.pathname === "/contact";
  const shouldShowContactCTA = !isHomePage && !isContactPage;

  return (
    <footer className="fixed bottom-0 left-0 right-0 py-3 sm:py-4 border-t border-border bg-background z-40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
        <div className="text-xs sm:text-sm text-muted-foreground text-center md:text-left order-3 md:order-1">
          © {currentYear} {resume.home.name}. All rights reserved.
        </div>

        <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground order-1 md:order-2">
          <FaMapMarkerAlt className="text-primary" />
          <span>San Francisco Bay Area, CA</span>
        </div>

        <div className="flex gap-3 sm:gap-4 items-center order-2 md:order-3 my-1 md:my-0">
          {shouldShowContactCTA && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0px 0px 0px rgba(99, 102, 241, 0)",
                  "0px 0px 8px rgba(99, 102, 241, 0.5)",
                  "0px 0px 0px rgba(99, 102, 241, 0)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="mr-1 sm:mr-3"
            >
              <Link href="/contact" passHref>
                <span className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2.5 text-xs sm:text-sm font-bold bg-primary text-white rounded-md shadow-md hover:bg-accent transition-colors duration-300 cursor-pointer">
                  <FaEnvelope className="sm:text-lg" />
                  <span className="hidden xs:inline">Contact Me</span>
                  <span className="xs:hidden">Contact</span>
                </span>
              </Link>
            </motion.div>
          )}
          <motion.a
            href={resume.home.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <FaGithub className="text-lg sm:text-xl" />
          </motion.a>
          <motion.a
            href={resume.home.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="text-lg sm:text-xl" />
          </motion.a>
        </div>
      </div>
    </footer>
  );
}

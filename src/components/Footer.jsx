import React from "react";
import { FaGithub, FaLinkedin, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import resume from "@/data/resume.json";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 mt-16 border-t border-border">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          © {currentYear} {resume.home.name}. All rights reserved.
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <FaMapMarkerAlt className="text-primary" />
          <span>San Francisco Bay Area, California</span>
        </div>

        <div className="flex gap-4 items-center">
          <motion.a
            href={resume.home.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <FaGithub className="text-xl" />
          </motion.a>
          <motion.a
            href={resume.home.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2 }}
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="text-xl" />
          </motion.a>
        </div>
      </div>
    </footer>
  );
}

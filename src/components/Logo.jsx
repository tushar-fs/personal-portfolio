import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Logo() {
  return (
    <Link href="/" passHref>
      <motion.div
        className="relative flex items-center justify-center w-10 h-10 rounded-md bg-gradient-to-br from-primary to-accent overflow-hidden cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="font-bold text-lg text-white">TS</span>
        <motion.div
          className="absolute inset-0 bg-white opacity-0"
          whileHover={{ opacity: 0.2 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </Link>
  );
}

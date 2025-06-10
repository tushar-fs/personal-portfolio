import resume from "@/data/resume.json";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedButton from "@/components/AnimatedButton";
import { FiMail, FiPhone } from "react-icons/fi";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

export default function HomePage() {
  const { name, email, phone } = resume.home;
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // The bio content as JSX to highlight "Software Engineer"
  const BioContent = () => (
    <>
      A results-driven{" "}
      <span className="font-bold text-primary">Software Engineer</span> with
      with nearly 3 years of industry experience at Tekion Corp of building
      beautiful, functional, and scalable web applications. Currently deepening
      my expertise in{" "}
      <span className="font-bold">
        Distributed Enterprise Systems, AI Engineering
      </span>{" "}
      at San Jose State University.
    </>
  );

  return (
    <main className="max-w-4xl mx-auto mt-24 sm:mt-28 md:mt-36 px-4 sm:px-6">
      <motion.section
        className="flex flex-col items-start"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Intro with waving emoji */}
        <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-4 w-full md:w-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">Hi</h2>
          <motion.span
            className="text-xl sm:text-2xl md:text-3xl"
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 20, -10, 20, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
          >
            👋
          </motion.span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">, I am</h2>
        </div>

        <h1
          className={`text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent mb-4 sm:mb-6 ${
            isDark
              ? "bg-gradient-to-r from-primary to-accent"
              : "bg-gradient-to-r from-primary-dark to-primary"
          }`}
        >
          {name}
        </h1>

        {/* Profile and Bio section */}
        <div className="flex flex-col md:flex-row-reverse items-center md:items-start gap-5 sm:gap-8 md:gap-8 mb-6 sm:mb-8 md:mb-8 w-full">
          <div className="flex-shrink-0">
            <div className="md:hidden">
              <Image
                src="/profile.jpg"
                alt={name + " profile"}
                width={140}
                height={140}
                className="rounded-full object-cover border-4 border-muted shadow-lg w-[140px] h-[140px] sm:w-[160px] sm:h-[160px]"
                priority
              />
            </div>
            <div className="hidden md:block">
              <Image
                src="/profile.jpg"
                alt={name + " profile"}
                width={180}
                height={180}
                className="rounded-full object-cover border-4 border-muted shadow-lg"
                priority
              />
            </div>
          </div>

          <div className="md:text-left w-full">
            <p className="text-base sm:text-lg md:text-lg text-muted-foreground max-w-2xl mb-4 sm:mb-6 md:mb-6">
              <BioContent />
            </p>

            {/* Mobile/Tablet Contact Info */}
            <div className="flex flex-col xs:flex-row items-start gap-3 sm:gap-4 mb-6 sm:mb-8 md:hidden">
              <motion.a
                href={`mailto:${email}`}
                className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2 rounded-lg bg-muted hover:bg-primary/10 border border-border transition-all duration-300 group w-full xs:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiMail className="text-lg sm:text-xl text-primary" />
                <span className="text-foreground text-sm sm:text-base font-medium group-hover:text-primary transition-colors duration-300">
                  {email}
                </span>
              </motion.a>

              <motion.div
                className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2 rounded-lg bg-muted hover:bg-primary/10 border border-border transition-all duration-300 w-full xs:w-auto"
                whileHover={{ scale: 1.05 }}
              >
                <FiPhone className="text-lg sm:text-xl text-primary" />
                <span className="text-foreground text-sm sm:text-base font-medium">
                  {phone}
                </span>
              </motion.div>
            </div>

            {/* Desktop Contact Info - Original Styling */}
            <div className="hidden md:flex md:flex-row md:items-start md:gap-4 md:mb-8">
              <motion.a
                href={`mailto:${email}`}
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-muted hover:bg-primary/10 border border-border transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiMail className="text-xl text-primary" />
                <span className="text-foreground font-medium group-hover:text-primary transition-colors duration-300">
                  {email}
                </span>
              </motion.a>

              <motion.div
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-muted hover:bg-primary/10 border border-border transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <FiPhone className="text-xl text-primary" />
                <span className="text-foreground font-medium">{phone}</span>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 sm:gap-4 md:gap-4 w-full max-w-md">
          {/* Mobile/Tablet Buttons */}
          <div className="w-full md:hidden">
            <div className="flex gap-3 sm:gap-4 w-full">
              <Link href="/experience" passHref className="flex-1">
                <AnimatedButton className="w-full text-sm sm:text-base py-2 px-3 sm:px-4">
                  View Experience
                </AnimatedButton>
              </Link>
              <Link href="/resume" passHref className="flex-1">
                <AnimatedButton
                  color="secondary"
                  className="w-full text-sm sm:text-base py-2 px-3 sm:px-4"
                >
                  View Resume
                </AnimatedButton>
              </Link>
            </div>
            <div className="mt-3 sm:mt-4">
              <Link href="/contact" passHref className="w-full">
                <AnimatedButton
                  color="primary"
                  className="w-full text-sm sm:text-base py-2 px-4 sm:px-4"
                >
                  Contact Me
                </AnimatedButton>
              </Link>
            </div>
          </div>

          {/* Desktop Buttons - Original Styling */}
          <div className="hidden md:flex md:flex-col md:w-full md:gap-4">
            <div className="flex gap-4 w-full">
              <Link href="/experience" passHref className="flex-1">
                <AnimatedButton className="w-full">
                  View Experience
                </AnimatedButton>
              </Link>
              <Link href="/resume" passHref className="flex-1">
                <AnimatedButton color="secondary" className="w-full">
                  View Resume
                </AnimatedButton>
              </Link>
            </div>
            <Link href="/contact" passHref className="w-full">
              <AnimatedButton color="primary" className="w-full">
                Contact Me
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </motion.section>
    </main>
  );
}

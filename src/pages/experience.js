import resume from "@/data/resume.json";
import { motion } from "framer-motion";
import { MdWork } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";
import React from "react";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
    },
  }),
};

// Function to highlight technical terms in text
const highlightTechTerms = (text) => {
  // List of technical terms to highlight - expand as needed
  const techTerms = [
    "NextJS",
    "React",
    "Material UI",
    "TypeScript",
    "Client-Side Rendering",
    "CSR",
    "Static Site Generation",
    "SSG",
    "SEO",
    "code-splitting",
    "lazy loading",
    "local storage",
    "session storage",
    "JavaScript",
    "hybrid rendering",
    "UI",
    "frontend",
    "Spring Boot",
    "API",
    "REST",
    "Java",
    "CSS",
    "Tailwind",
    "Redux",
    "CRUD",
  ];

  // Sort by length (longest first) to avoid partial replacements
  techTerms.sort((a, b) => b.length - a.length);

  // Create a regex pattern to match any of the tech terms with word boundaries
  const pattern = new RegExp(`\\b(${techTerms.join("|")})\\b`, "gi");

  // Split the text by matched terms and wrap the terms in styled spans
  const parts = text.split(pattern);

  return parts.map((part, i) => {
    // Check if this part matches any of our tech terms (case insensitive)
    const isTechTerm = techTerms.some(
      (term) => part.toLowerCase() === term.toLowerCase()
    );

    return isTechTerm ? (
      <span
        key={i}
        className="font-bold text-primary bg-primary/5 px-1 rounded"
      >
        {part}
      </span>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    );
  });
};

export default function ExperiencePage() {
  return (
    <main className="max-w-4xl mx-auto mt-24 md:mt-32 px-6">
      <h1 className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
        Professional Experience
      </h1>
      <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
        A timeline of my professional journey and contributions
      </p>

      <ul className="space-y-8">
        {resume.experience.map((exp, idx) => (
          <motion.li
            key={idx}
            className="bg-muted p-6 md:p-8 rounded-lg border border-border shadow-sm overflow-hidden relative"
            custom={idx}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            {/* Accent color decoration */}
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-accent"></div>

            <div className="flex items-start gap-4 ml-3">
              <div className="p-2 rounded-full bg-primary/10 text-primary mt-1">
                <MdWork size={24} />
              </div>
              <div>
                <div className="flex items-center flex-wrap gap-2 mb-1">
                  <h2 className="text-2xl text-foreground font-bold">
                    {exp.role}
                  </h2>
                  <span className="text-primary font-bold">@</span>
                  <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-dark to-primary">
                    {exp.company}
                  </span>
                </div>

                <p className="text-md text-muted-foreground mb-4 flex items-center gap-2">
                  <span className="bg-background px-3 py-1 text-sm rounded-full border border-border text-muted-foreground">
                    {exp.duration}
                  </span>
                  <span className="text-muted-foreground/70">&bull;</span>
                  <span className="text-muted-foreground">{exp.location}</span>
                </p>

                <ul className="space-y-3 mt-4">
                  {exp.points.map((point, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-3 group"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                    >
                      <FiCheckCircle className="text-primary mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                        {highlightTechTerms(point)}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </main>
  );
}

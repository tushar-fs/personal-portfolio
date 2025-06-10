import resume from "@/data/resume.json";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaLaptopCode } from "react-icons/fa";
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
    "Python",
    "FastAPI",
    "Docker",
    "Natural Language",
    "Vector Database",
    "ChromaDB",
    "Google Gemini API",
    "Sentence-Transformers",
    "Hugging face",
    "Tailwind CSS",
    "NPM",
    "RAG",
    "Spring Boot",
    "API",
    "REST",
    "Java",
    "JDBC",
    "MySQL",
    "Spring JPA",
    "Gradle",
    "Google Places API",
    "frontend",
    "backend",
    "full-stack",
    "Docker",
    "semantic search",
    "Spring",
    "Spring Boot",
    "knowledge base",
    "LLM",
    "Pipeline",
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

export default function ProjectsPage() {
  return (
    <main className="max-w-4xl mx-auto mt-24 md:mt-32 px-6">
      <h1 className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
        Academic & Personal Projects
      </h1>
      <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
        Showcasing my technical skills and passion for building innovative
        solutions
      </p>

      <ul className="space-y-8">
        {resume.projects.map((project, idx) => (
          <motion.li
            key={idx}
            className="bg-muted p-6 rounded-lg border border-border flex flex-col h-full relative overflow-hidden group"
            custom={idx}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary-dark"></div>

            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-full bg-[#06b6d4]/10 text-[#06b6d4]">
                <FaLaptopCode />
              </div>
              <h2 className="text-2xl text-foreground font-bold">
                {project.name}
              </h2>
            </div>

            <ul className="space-y-3 mt-2 mb-4 flex-grow">
              {project.description.map((desc, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3 group/item"
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <FiCheckCircle className="text-primary mt-1 flex-shrink-0 group-hover/item:scale-110 transition-all" />
                  <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">
                    {highlightTechTerms(desc)}
                  </span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-auto">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, i) => (
                  <motion.span
                    key={i}
                    className="bg-background px-3 py-1 text-sm rounded-full border border-border text-muted-foreground hover:bg-background/80 transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>

              <div className="flex items-center gap-4 pt-3 border-t border-border text-muted-foreground">
                {project.githubUrl && (
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                    whileHover={{ scale: 1.05, color: "#6366f1" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGithub /> GitHub
                  </motion.a>
                )}
                {project.liveUrl && (
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                    whileHover={{ scale: 1.05, color: "#6366f1" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </motion.a>
                )}
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </main>
  );
}

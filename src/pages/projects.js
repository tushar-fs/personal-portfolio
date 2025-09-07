import resume from "@/data/resume.json";
import Head from "next/head";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaLaptopCode } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import React from "react";
import Image from "next/image";
import Link from "next/link";

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
    "Flask",
    "Chrome Extension",
    "JavaScript",
    "HTML5",
    "ES6 Modules",
    "The Green Web Foundation API",
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
    <>
      <Head>
        <title>Projects | Tushar Singh</title>
        <meta
          name="description"
          content="Academic and personal projects by Tushar Singh showcasing expertise in Full Stack Development, AI Engineering, and modern web technologies."
        />
      </Head>
      <main className="max-w-6xl mx-auto mt-24 md:mt-32 px-6">
        <h1 className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          Academic & Personal Projects
        </h1>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Showcasing my technical skills and passion for building innovative
          solutions
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resume.projects.map((project, idx) => (
            <motion.div
              key={idx}
              className="bg-muted rounded-xl border border-border overflow-hidden flex flex-col h-full shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              onClick={() =>
                window.open(project.githubUrl, "_blank", "noopener,noreferrer")
              }
            >
              {/* GitHub Repository Preview Image */}
              {project.imageUrl && (
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={`${project.name} preview`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-1">
                      {project.name}
                    </h2>
                    {project.role && (
                      <span className="inline-block bg-primary/80 text-white text-xs px-3 py-1 rounded-full">
                        {project.role}
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="p-6 flex flex-col flex-grow">
                {/* Project description */}
                <ul className="space-y-3 mb-6 flex-grow">
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

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 6).map((tech, i) => (
                    <motion.span
                      key={i}
                      className="bg-background px-3 py-1 text-xs rounded-full border border-border text-muted-foreground hover:bg-background/80 transition-colors duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                  {project.technologies.length > 6 && (
                    <motion.span
                      className="bg-primary/10 px-3 py-1 text-xs rounded-full text-primary hover:bg-primary/20 transition-colors duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      +{project.technologies.length - 6} more
                    </motion.span>
                  )}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4 pt-3 border-t border-border text-muted-foreground">
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-primary transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => e.stopPropagation()}
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
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaExternalLinkAlt /> Live Demo
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </>
  );
}

import resume from "@/data/resume.json";
import Head from "next/head";
import { motion } from "framer-motion";
import { MdWork, MdLocationOn, MdDateRange } from "react-icons/md";
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
    // Frontend frameworks & libraries
    "NextJS",
    "Next.js",
    "React",
    "Material UI",
    "TypeScript",
    "JavaScript",
    "Webpack",
    "Module Federation",
    "Redux",
    "List virtualization",

    // Rendering techniques
    "Client-Side Rendering",
    "CSR",
    "Static Site Generation",
    "SSG",
    "hybrid rendering model",
    "hybrid rendering",

    // Performance & optimization
    "SEO",
    "code-splitting",
    "lazy loading",
    "Largest Contentful Paint",
    "LCP",
    "FPS",
    "main-thread blocking",
    "Google Lighthouse score",

    // Storage & state
    "local storage",
    "session storage",

    // Real-time technologies
    "Server-Sent Events",
    "short-polling",

    // Backend & APIs
    "Spring Boot",
    "API",
    "REST",
    "Java",
    "MySQL",
    "Elasticsearch",

    // Frontend concepts
    "UI",
    "frontend",
    "microfrontend",
    "microfrontend architecture",

    // CSS & styling
    "CSS",
    "Tailwind",

    // Database operations
    "CRUD",

    // Dev tools & processes
    "Jenkins CI/CD pipeline",
    "Git pre-commit hooks",
    "JSON-driven",
    "forms engine",
    "test suite",
    "test coverage",
    "Accounts Receivable",
    "AR",
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

// Emphasize measurable outcomes like numbers and percentages while preserving tech highlighting
const emphasizeText = (text) => {
  const nodes = highlightTechTerms(text);
  const numberRegex =
    /(\b\d+(?:\.\d+)?\s?(?:%|x|X|ms|s|sec|seconds|mins|minutes|hrs|hours)?\b)/;

  const isNumericToken = (token) => {
    return new RegExp(`^${numberRegex.source}$`).test(token);
  };

  let nodeKey = 0;
  return nodes.flatMap((node, idx) => {
    if (typeof node !== "string") {
      return [React.cloneElement(node, { key: `tech-${idx}` })];
    }
    const segments = node.split(new RegExp(`(${numberRegex.source})`, "g"));
    return segments.map((seg) => {
      const key = `seg-${nodeKey++}`;
      if (!seg) return null;
      if (isNumericToken(seg)) {
        return (
          <span key={key} className="font-semibold text-foreground">
            {seg}
          </span>
        );
      }
      return <React.Fragment key={key}>{seg}</React.Fragment>;
    });
  });
};

// Build a map of "Role @ Company" -> [skills]
const buildExperienceToSkillsMap = () => {
  const mapping = {};
  const skillsByCategory = resume.skills || {};
  Object.values(skillsByCategory).forEach((skillArray) => {
    skillArray.forEach((skill) => {
      const usedIn = skill.usedIn;
      if (usedIn && Array.isArray(usedIn.experience)) {
        usedIn.experience.forEach((expKey) => {
          if (!mapping[expKey]) mapping[expKey] = [];
          mapping[expKey].push(skill.name);
        });
      }
    });
  });
  // Deduplicate
  Object.keys(mapping).forEach((k) => {
    mapping[k] = Array.from(new Set(mapping[k]));
  });
  return mapping;
};

const experienceToSkills = buildExperienceToSkillsMap();

// Company logo mapping - add more as needed
const companyLogos = {
  "Tekion Corp": "/tekion_logo.png", // Add this image to your public folder
};

export default function ExperiencePage() {
  return (
    <>
      <Head>
        <title>Experience | Tushar Singh</title>
        <meta
          name="description"
          content="Professional experience of Tushar Singh - Software Engineer with expertise in Full Stack Development, React, Java, Spring Boot, and enterprise systems."
        />
      </Head>
      <main className="max-w-6xl mx-auto mt-24 md:mt-32 px-6">
        <h1 className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          Professional Experience
        </h1>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          A concise, verifiable summary of roles, impact, and technologies
        </p>

        <div className="grid grid-cols-1 gap-8">
          {resume.experience.map((exp, idx) => {
            const expKey = `${exp.role} @ ${exp.company}`;
            const skills = experienceToSkills[expKey] || [];

            return (
              <motion.div
                key={idx}
                className="bg-muted rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                {/* Header with gradient background */}
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 md:p-8 border-b border-border">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                    {/* Company logo placeholder - replace with actual logos */}
                    <div className="flex-shrink-0 w-16 h-16 bg-background rounded-full flex items-center justify-center border border-border">
                      <MdWork size={32} className="text-primary" />
                    </div>

                    <div className="flex-1">
                      {/* Role and company */}
                      <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                        <h2 className="text-2xl text-foreground font-bold">
                          {exp.role}
                        </h2>
                        <div className="hidden md:block text-primary font-bold">
                          @
                        </div>
                        <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                          {exp.company}
                        </div>
                      </div>

                      {/* Duration and location */}
                      <div className="flex flex-wrap items-center gap-4 mt-2 text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MdDateRange className="text-primary" />
                          <span>{exp.duration}</span>
                          {exp.company === "Tekion Corp" && (
                            <span className="ml-1 bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                              {exp.role === "Software Engineer"
                                ? "2 years 6 months"
                                : "6 months"}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <MdLocationOn className="text-primary" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  {/* Tech Stack chips */}
                  {skills.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                        Tech Stack
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, i) => (
                          <motion.span
                            key={`${expKey}-skill-${i}`}
                            className="bg-background px-3 py-1.5 text-sm rounded-full border border-border text-muted-foreground hover:border-primary/30 hover:bg-primary/5 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Key Achievements */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                      Key Achievements
                    </h3>
                    <ul className="space-y-4">
                      {exp.points.map((point, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start gap-3 group bg-background/50 p-3 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-background transition-all"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + i * 0.1 }}
                        >
                          <FiCheckCircle className="text-primary mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                          <span className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                            {emphasizeText(point)}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>
    </>
  );
}

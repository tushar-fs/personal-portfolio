import resume from "@/data/resume.json";
import Head from "next/head";
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
      <main className="max-w-4xl mx-auto mt-24 md:mt-32 px-6">
        <h1 className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          Professional Experience
        </h1>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          A concise, verifiable summary of roles, impact, and technologies
        </p>

        <div className="relative">
          <div
            className="absolute left-3 md:left-4 top-0 bottom-0 w-px bg-border"
            aria-hidden
          />
          <ul className="space-y-10 ml-8 md:ml-12">
            {resume.experience.map((exp, idx) => (
              <motion.li
                key={idx}
                className="relative bg-muted p-6 md:p-8 rounded-lg border border-border shadow-sm overflow-hidden"
                custom={idx}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                {/* Timeline node */}
                <div
                  className="absolute -left-9 md:-left-12 top-8 w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20"
                  aria-hidden
                />

                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-primary/10 text-primary mt-1">
                    <MdWork size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center flex-wrap gap-2 mb-1">
                      <h2 className="text-2xl text-foreground font-bold">
                        {exp.role}
                      </h2>
                      <span className="text-primary font-bold">@</span>
                      <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-dark to-primary">
                        {exp.company}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="bg-background px-3 py-1 text-sm rounded-full border border-border text-muted-foreground">
                        {exp.duration}
                      </span>
                      <span className="text-muted-foreground/70">•</span>
                      <span className="bg-background px-3 py-1 text-sm rounded-full border border-border text-muted-foreground">
                        {exp.location}
                      </span>
                    </div>

                    {/* Tech Stack chips (derived from resume.skills) */}
                    {(() => {
                      const expKey = `${exp.role} @ ${exp.company}`;
                      const skills = experienceToSkills[expKey] || [];
                      if (skills.length === 0) return null;
                      return (
                        <div className="mb-4">
                          <div className="text-sm font-semibold text-foreground mb-2">
                            Tech Stack
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {skills.slice(0, 10).map((skill, i) => (
                              <span
                                key={`${expKey}-skill-${i}`}
                                className="bg-background px-3 py-1 text-xs rounded-full border border-border text-muted-foreground"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })()}

                    <div className="border-t border-border/70 my-4" />
                    <div className="text-sm uppercase tracking-wide text-muted-foreground/80 mb-2">
                      Key Achievements
                    </div>

                    <ul className="space-y-3 mt-2">
                      {exp.points.map((point, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start gap-3 group"
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
              </motion.li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}

import resume from "@/data/resume.json";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCpu,
  FiDatabase,
  FiTool,
  FiServer,
  FiChevronDown,
  FiChevronUp,
  FiBriefcase,
  FiCode,
} from "react-icons/fi";
import {
  FaReact,
  FaJava,
  FaNodeJs,
  FaPython,
  FaJs,
  FaCss3Alt,
  FaNpm,
  FaYarn,
  FaGit,
  FaDocker,
  FaFigma,
} from "react-icons/fa";
import {
  SiRedux,
  SiTailwindcss,
  SiNextdotjs,
  SiMui,
  SiCplusplus,
  SiSpring,
  SiSpringboot,
  SiGradle,
  SiMysql,
  SiRedis,
  SiApachekafka,
  SiRabbitmq,
  SiPostman,
  SiJenkins,
  SiIntellijidea,
  SiOpenai,
  SiHuggingface,
  SiFastapi,
  SiMqtt,
} from "react-icons/si";
import { TbBrandCpp, TbSql } from "react-icons/tb";
import { BsVectorPen } from "react-icons/bs";
import { GrGoogle } from "react-icons/gr";
import { useState, useEffect } from "react";

const categoryIconMap = {
  "Programming Languages": <FiCpu className="text-primary" />,
  Frontend: <FaReact className="text-primary" />,
  Backend: <FiDatabase className="text-primary" />,
  "AI Engineering": <BsVectorPen className="text-primary" />,
  "Databases & Message queues": <FiDatabase className="text-primary" />,
  "Software Tools": <FiTool className="text-primary" />,
};

// Map for individual skill icons
const skillIconMap = {
  // Programming Languages
  "JavaScript (ES6+)": <FaJs />,
  Java: <FaJava />,
  "C++": <SiCplusplus />,
  Python: <FaPython />,
  SQL: <TbSql />,

  // Frontend
  React: <FaReact />,
  "Next.js": <SiNextdotjs />,
  Redux: <SiRedux />,
  "Tailwind CSS": <SiTailwindcss />,
  Sass: <FaCss3Alt />,
  "Material UI": <SiMui />,
  NPM: <FaNpm />,
  Yarn: <FaYarn />,

  // Backend
  Spring: <SiSpring />,
  "Spring Boot": <SiSpringboot />,
  Gradle: <SiGradle />,
  "Spring JPA": <SiSpring />,
  JDBC: <FaJava />,
  FastAPI: <SiFastapi />,
  "Node.js": <FaNodeJs />,

  // AI Engineering
  LLM: <BsVectorPen />,
  RAG: <BsVectorPen />,
  "Vector Database": <BsVectorPen />,
  ChromaDB: <FiDatabase />,
  Gemini: <GrGoogle />,
  OpenAI: <SiOpenai />,
  [`Hugging Face`]: <SiHuggingface />,
  "Sentence-Transformers": <BsVectorPen />,

  // Databases & Message queues
  MySQL: <SiMysql />,
  NoSQL: <FiDatabase />,
  Redis: <SiRedis />,
  RabbitMQ: <SiRabbitmq />,
  Kafka: <SiApachekafka />,
  MQTT: <SiMqtt />,

  // Software Tools
  Git: <FaGit />,
  Docker: <FaDocker />,
  Figma: <FaFigma />,
  IntelliJ: <SiIntellijidea />,
  Postman: <SiPostman />,
  Jenkins: <SiJenkins />,
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
    },
  }),
};

// Function to find where a skill is used (projects and experience)
const findSkillUsage = (skill) => {
  const skillObj = Object.values(resume.skills)
    .flat()
    .find((s) => s.name === skill);

  if (skillObj && skillObj.usedIn) {
    return skillObj.usedIn;
  }

  // Fallback to the original search method if not found in the structured data
  const usage = {
    projects: [],
    experience: [],
  };

  // Check projects
  resume.projects.forEach((project) => {
    // Check in technologies
    if (project.technologies.includes(skill)) {
      usage.projects.push({
        name: project.name,
        type: "technologies",
      });
      return;
    }

    // Check in descriptions
    project.description.forEach((desc) => {
      if (desc.includes(skill)) {
        usage.projects.push({
          name: project.name,
          type: "description",
        });
      }
    });
  });

  // Check experience
  resume.experience.forEach((exp) => {
    exp.points.forEach((point) => {
      if (point.includes(skill)) {
        usage.experience.push({
          role: exp.role,
          company: exp.company,
        });
      }
    });
  });

  return usage;
};

// Skill item component with usage details
function SkillItem({ skill }) {
  const [showUsage, setShowUsage] = useState(false);
  const [usage, setUsage] = useState(null);

  const toggleUsage = () => {
    if (!usage && !showUsage) {
      setUsage(findSkillUsage(skill));
    }
    setShowUsage(!showUsage);
  };

  const hasUsage =
    usage &&
    ((Array.isArray(usage.projects) && usage.projects.length > 0) ||
      (Array.isArray(usage.experience) && usage.experience.length > 0));

  return (
    <div className="mb-2">
      <motion.div
        className="bg-background text-sm px-3 py-1 rounded-lg border border-border text-muted-foreground flex items-center gap-2 cursor-pointer"
        whileHover={{ scale: 1.02, backgroundColor: "var(--primary-50)" }}
        transition={{ duration: 0.2 }}
        onClick={toggleUsage}
      >
        <span className="text-primary">{skillIconMap[skill] || <FiCpu />}</span>
        <span>{skill}</span>
        <button
          className="ml-auto text-muted-foreground hover:text-primary transition-colors"
          aria-label={showUsage ? "Hide usage" : "Show usage"}
        >
          {showUsage ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
        </button>
      </motion.div>

      <AnimatePresence>
        {showUsage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="ml-8 mt-2 mb-3 text-sm">
              {!hasUsage && (
                <p className="text-muted-foreground italic">
                  No specific usage found in projects or experience.
                </p>
              )}

              {usage &&
                Array.isArray(usage.projects) &&
                usage.projects.length > 0 && (
                  <div className="mb-2">
                    <div className="flex items-center gap-2 text-primary font-medium mb-1">
                      <FiCode size={14} />
                      <span>Projects</span>
                    </div>
                    <ul className="space-y-1 pl-5 list-disc text-muted-foreground">
                      {usage.projects.map((project, idx) => (
                        <li key={idx}>
                          {typeof project === "string" ? project : project.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {usage &&
                Array.isArray(usage.experience) &&
                usage.experience.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 text-primary font-medium mb-1">
                      <FiBriefcase size={14} />
                      <span>Experience</span>
                    </div>
                    <ul className="space-y-1 pl-5 list-disc text-muted-foreground">
                      {usage.experience.map((exp, idx) => (
                        <li key={idx}>
                          {typeof exp === "string"
                            ? exp
                            : `${exp.role} @ ${exp.company}`}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SkillsPage() {
  const skillsData = resume.skills;

  return (
    <main className="max-w-4xl mx-auto mt-24 md:mt-32 px-6 mb-16">
      <h1 className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
        Technical Skills
      </h1>
      <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
        Technologies and tools I&apos;ve worked with - click on a skill to see
        where it&apos;s been used
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(skillsData).map(([category, items], idx) => (
          <motion.div
            key={category}
            className="bg-muted p-6 rounded-lg border border-border"
            custom={idx}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <h2 className="text-xl text-foreground mb-4 flex items-center gap-3">
              {categoryIconMap[category] || <FiCpu className="text-primary" />}
              {category}
            </h2>
            <ul>
              {items.map((item, i) => (
                <SkillItem key={i} skill={item.name} />
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </main>
  );
}

import resume from "@/data/resume.json";
import { motion } from "framer-motion";
import { FaUniversity, FaBook, FaGraduationCap } from "react-icons/fa";
import Image from "next/image";

// Map university names to their logo files
const universityLogos = {
  "San Jose State University": "/sjsu_logo.jpg",
  "National Institute of Technology": "/NITM_logo.jpg",
};

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

export default function EducationPage() {
  return (
    <main className="max-w-4xl mx-auto mt-24 md:mt-32 px-6">
      <h1 className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
        Education
      </h1>
      <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
        My academic journey and coursework
      </p>
      <ul className="space-y-8">
        {resume.education.map((edu, idx) => (
          <motion.li
            key={idx}
            className="bg-muted p-6 rounded-lg border border-border shadow-sm"
            custom={idx}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                {universityLogos[edu.institution] ? (
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30 flex items-center justify-center bg-white">
                    <Image
                      src={universityLogos[edu.institution]}
                      alt={edu.institution}
                      width={64}
                      height={64}
                      className="object-contain p-1"
                    />
                  </div>
                ) : (
                  <div className="text-primary mt-1">
                    <FaUniversity size={24} />
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-2xl text-foreground">{edu.institution}</h2>
                <p className="text-md text-muted-foreground">{edu.degree}</p>
                <div className="flex items-center gap-2 mt-1 mb-1">
                  <FaGraduationCap className="text-primary" />
                  <span className="text-md font-medium text-primary">
                    GPA: {edu.gpa}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground/80">
                  {edu.duration} &bull; {edu.location}
                </p>

                <div className="mt-4">
                  <h3 className="font-bold text-lg flex items-center gap-2">
                    <FaBook /> Coursework
                  </h3>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {edu.coursework.map((course, i) => (
                      <li
                        key={i}
                        className="bg-background px-3 py-1 text-sm rounded-full border border-border text-muted-foreground"
                      >
                        {course}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </main>
  );
}

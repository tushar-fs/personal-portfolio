import { useState, useEffect } from "react";
import resume from "../data/resume.json";
import Head from "next/head";
import { motion } from "framer-motion";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaTrophy,
  FaCode,
  FaNewspaper,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaCheckCircle,
  FaMedal,
  FaFire,
  FaLaptopCode as FaLeetcode,
  FaGlobe as FaDevpost,
} from "react-icons/fa";
import { SiGeeksforgeeks } from "react-icons/si";

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

async function fetchLeetCodeData(username) {
  const BASE_URL = `https://alfa-leetcode-api.onrender.com`;
  const promise1 = fetch(`${BASE_URL}/${username}`).then((res) => res.json());
  const promise2 = fetch(`${BASE_URL}/${username}/badges`).then((res) =>
    res.json()
  );
  const promise3 = fetch(`${BASE_URL}/${username}/solved`).then((res) =>
    res.json()
  );
  const promise4 = fetch(`${BASE_URL}/languageStats?username=${username}`).then(
    (res) => res.json()
  );

  let [userData, badges, solved, languageStats] = await Promise.allSettled([
    promise1,
    promise2,
    promise3,
    promise4,
  ]);

  if (userData.status === "fulfilled") {
    userData = userData.value;
  } else {
    userData = [];
  }
  if (badges.status === "fulfilled") {
    badges = badges.value;
  } else {
    badges = [];
  }
  if (solved.status === "fulfilled") {
    solved = solved.value;
  } else {
    solved = [];
  }
  if (languageStats.status === "fulfilled") {
    languageStats = languageStats.value;
  } else {
    languageStats = [];
  }

  return { userData, badges, solved, languageStats };
}

export default function ActivitiesPage() {
  // Get all data from resume.json
  const { hackathons, codingChallenges, articles } = resume.activities;

  const [leetCodeData, setLeetCodeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    (async function () {
      try {
        const leetCodeData = await fetchLeetCodeData(
          codingChallenges.leetcode.username
        );
        setLeetCodeData(leetCodeData);
      } catch (error) {
        console.error("Error fetching LeetCode data:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [codingChallenges.leetcode.username]);

  return (
    <>
      <Head>
        <title>Achievements | Tushar Singh</title>
        <meta
          name="description"
          content="Hackathons, coding challenges, and technical articles by Tushar Singh showcasing problem-solving skills, competitive achievements, and technical expertise."
        />
      </Head>
      <main className="max-w-6xl mx-auto mt-24 md:mt-32 px-6 pb-20">
        <h1 className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          Technical Achievements
        </h1>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Showcasing my participation in hackathons, coding challenges, and
          technical writing
        </p>

        {/* Hackathons Section */}
        <section className="mb-16">
          <div className="flex items-center flex-wrap gap-3 mb-8">
            <div className="p-2 rounded-full bg-primary/10">
              <FaTrophy className="text-primary text-xl" />
            </div>
            <h2 className="text-2xl font-bold">Hackathon Participation</h2>
            <Link
              href="https://devpost.com/tushar-singh01?ref_content=user-portfolio&ref_feature=portfolio&ref_medium=global-nav"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 inline-flex items-center gap-1.5 bg-gradient-to-r from-primary/80 to-accent/80 hover:from-primary hover:to-accent text-white text-xs px-3 py-1.5 rounded-md shadow-sm hover:shadow transition-all"
            >
              <FaDevpost className="text-sm" /> Devpost Profile
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hackathons?.map((hackathon, idx) => (
              <motion.div
                key={idx}
                className="bg-muted rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-5 border-b border-border">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div>
                      <h3 className="text-xl font-bold">{hackathon.name}</h3>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mt-1">
                        <FaDevpost className="text-primary" />
                        <span>{hackathon.platform}</span>
                        <span>•</span>
                        <FaCalendarAlt className="text-primary" />
                        <span>{hackathon.date}</span>
                      </div>
                    </div>
                    {hackathon.achievement && (
                      <span className="bg-primary/20 text-primary text-sm px-3 py-1 rounded-full flex items-center gap-1 self-start sm:self-auto">
                        <FaMedal /> {hackathon.achievement}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5">
                  <div className="mb-4">
                    <div className="font-semibold mb-1">
                      Project: {hackathon.project}
                    </div>
                    <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1 ml-1">
                      {Array.isArray(hackathon.description) ? (
                        hackathon.description.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))
                      ) : (
                        <li>{hackathon.description}</li>
                      )}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {hackathon?.technologies?.map((tech, i) => (
                      <span
                        key={i}
                        className="bg-background px-3 py-1 text-xs rounded-full border border-border text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {hackathon?.link && (
                    <a
                      href={hackathon.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-primary hover:underline mt-2"
                    >
                      <FaExternalLinkAlt /> View Project on Devpost
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Coding Challenges Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 rounded-full bg-primary/10">
              <FaCode className="text-primary text-xl" />
            </div>
            <h2 className="text-2xl font-bold">Coding Challenges</h2>
          </div>

          {codingChallenges.leetcode && (
            <motion.div
              className="bg-muted rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 p-6 border-b border-border relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-[#f89f1b]/15 rounded-xl shadow-sm transform transition-all group-hover:scale-105">
                      <FaLeetcode className="text-[#f89f1b] text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground flex flex-wrap items-center gap-2">
                        LeetCode Profile
                        {!isLoading && leetCodeData && (
                          <div className="inline-flex items-center ml-2">
                            <span className="relative bg-primary/20 text-primary text-xs px-3 py-1 rounded-full flex items-center gap-1">
                              <span className="absolute flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                              </span>
                              <span className="pl-3.5">Live Data</span>
                            </span>
                          </div>
                        )}
                      </h3>
                      <div className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
                        <span className="inline-block h-4 w-4 bg-primary/10 rounded-full flex items-center justify-center text-[10px] text-primary">
                          @
                        </span>
                        {codingChallenges.leetcode.username}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 right-0 opacity-5 z-0">
                  <FaLeetcode className="text-primary text-[120px] transform translate-x-8 -translate-y-8" />
                </div>
              </div>

              <div className="p-6 space-y-8">
                {isLoading ? (
                  <div className="flex justify-center items-center py-16">
                    <div className="animate-pulse flex flex-col items-center">
                      <div className="h-16 w-16 bg-primary/20 rounded-full mb-4 animate-spin-slow"></div>
                      <div className="h-5 bg-primary/10 rounded-full w-48 mb-3"></div>
                      <div className="h-4 bg-primary/10 rounded-full w-32"></div>
                      <div className="mt-8 flex gap-2">
                        <div className="h-2 w-2 bg-primary/30 rounded-full animate-bounce delay-75"></div>
                        <div className="h-2 w-2 bg-primary/30 rounded-full animate-bounce delay-100"></div>
                        <div className="h-2 w-2 bg-primary/30 rounded-full animate-bounce delay-150"></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Stats Overview */}
                    <div className="mb-6">
                      {/* Problems Solved */}
                      <div className="bg-gradient-to-r from-background to-background/80 p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-all">
                        {leetCodeData?.solved?.solvedProblem ? (
                          <div className="space-y-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                              <div className="flex flex-col">
                                <div className="text-sm uppercase tracking-wider text-muted-foreground/70 mb-1">
                                  Total Problems Solved
                                </div>
                                <div className="flex items-baseline gap-2">
                                  <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                                    {leetCodeData.solved.solvedProblem}
                                  </span>
                                  <span className="text-sm text-muted-foreground">
                                    problems
                                  </span>
                                </div>
                              </div>

                              <div className="flex gap-2">
                                <div className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm flex items-center gap-1">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                  </svg>
                                  Stats
                                </div>
                                <a
                                  href={`https://leetcode.com/${codingChallenges.leetcode.username}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-3 py-1 bg-background border border-border rounded-lg text-sm flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                    />
                                  </svg>
                                  View
                                </a>
                              </div>
                            </div>

                            {leetCodeData?.solved?.easySolved &&
                              leetCodeData?.solved?.mediumSolved &&
                              leetCodeData?.solved?.hardSolved && (
                                <div className="space-y-4">
                                  <div className="text-sm uppercase tracking-wider text-muted-foreground/70 mb-2">
                                    Problem Breakdown
                                  </div>
                                  <div className="grid grid-cols-1 xs:grid-cols-3 gap-4">
                                    <div className="flex flex-col rounded-lg bg-green-800/10 dark:bg-green-900/30 p-3 border border-green-600/30 dark:border-green-800 shadow-sm">
                                      <span className="text-xl font-bold text-green-700 dark:text-white-400">
                                        {leetCodeData.solved.easySolved}
                                      </span>
                                      <span className="text-xs bg-green-700 dark:bg-green-800 text-white mt-1 flex items-center font-medium px-2.5 py-0.5 rounded-md">
                                        <span className="w-2 h-2 rounded-full bg-white mr-1.5"></span>
                                        Easy
                                      </span>
                                    </div>

                                    <div className="flex flex-col rounded-lg bg-yellow-800/10 dark:bg-amber-900/30 p-3 border border-yellow-600/30 dark:border-amber-800 shadow-sm">
                                      <span className="text-xl font-bold text-yellow-700 dark:text-white-400">
                                        {leetCodeData.solved.mediumSolved}
                                      </span>
                                      <span className="text-xs bg-yellow-700 dark:bg-amber-800 text-white mt-1 flex items-center font-medium px-2.5 py-0.5 rounded-md">
                                        <span className="w-2 h-2 rounded-full bg-white mr-1.5"></span>
                                        Medium
                                      </span>
                                    </div>

                                    <div className="flex flex-col rounded-lg bg-red-800/10 dark:bg-red-900/30 p-3 border border-red-600/30 dark:border-red-800 shadow-sm">
                                      <span className="text-xl font-bold text-red-700 dark:text-white-400">
                                        {leetCodeData.solved.hardSolved}
                                      </span>
                                      <span className="text-xs bg-red-700 dark:bg-red-800 text-white mt-1 flex items-center font-medium px-2.5 py-0.5 rounded-md">
                                        <span className="w-2 h-2 rounded-full bg-white mr-1.5"></span>
                                        Hard
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              )}
                          </div>
                        ) : (
                          <div className="py-8 flex flex-col items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-10 w-10 text-muted-foreground/30 mb-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                              />
                            </svg>
                            <div className="text-base font-medium text-muted-foreground mb-1">
                              Could not fetch problem data
                            </div>
                            <div className="text-sm text-muted-foreground/70">
                              Try again later or check your connection
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Language Stats */}
                    <div className="mb-6">
                      <div className="bg-gradient-to-r from-background to-background/80 p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-all">
                        <div className="flex flex-col space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm uppercase tracking-wider text-muted-foreground/70">
                              Preferred Languages
                            </h4>
                            <span className="text-xs px-2 py-0.5 rounded bg-primary/5 text-primary">
                              Most Used
                            </span>
                          </div>

                          {leetCodeData?.languageStats?.matchedUser &&
                          leetCodeData.languageStats?.matchedUser
                            ?.languageProblemCount?.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {leetCodeData.languageStats.matchedUser.languageProblemCount
                                .slice(0, 6) // Limit to top 6 languages
                                .sort(
                                  (a, b) => b.problemsSolved - a.problemsSolved
                                ) // Sort by most problems solved
                                .map(({ languageName, problemsSolved }, i) => {
                                  // Calculate percentage for bar width based on the highest count
                                  const maxCount = Math.max(
                                    ...leetCodeData.languageStats.matchedUser.languageProblemCount.map(
                                      (l) => l.problemsSolved
                                    )
                                  );
                                  const percentage =
                                    (problemsSolved / maxCount) * 100;

                                  // Get language color (simplified version)
                                  const languageColors = {
                                    "C++": "from-blue-500 to-blue-600",
                                    Java: "from-red-500 to-red-600",
                                    Python: "from-yellow-500 to-yellow-600",
                                    JavaScript: "from-yellow-400 to-yellow-500",
                                    TypeScript: "from-blue-400 to-blue-500",
                                    Go: "from-cyan-500 to-cyan-600",
                                    Ruby: "from-red-600 to-red-700",
                                    Swift: "from-orange-500 to-orange-600",
                                    "C#": "from-purple-500 to-purple-600",
                                    Kotlin: "from-purple-400 to-purple-500",
                                    Rust: "from-orange-600 to-orange-700",
                                  };

                                  const gradientClass =
                                    languageColors[languageName] ||
                                    "from-gray-400 to-gray-500";

                                  return (
                                    <div key={i} className="flex flex-col">
                                      <div className="flex justify-between items-center mb-1 text-sm">
                                        <span className="font-medium">
                                          {languageName}
                                        </span>
                                        <span className="text-primary font-semibold">
                                          {problemsSolved}
                                        </span>
                                      </div>
                                      <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                                        <div
                                          className={`h-full rounded-full bg-gradient-to-r ${gradientClass}`}
                                          style={{ width: `${percentage}%` }}
                                        ></div>
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          ) : (
                            <div className="bg-background p-6 rounded-lg border border-border text-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 mx-auto text-muted-foreground/30 mb-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                              <p className="text-base text-muted-foreground">
                                No language statistics available
                              </p>
                              <p className="text-sm text-muted-foreground/70 mt-1">
                                Solve some problems to see your stats
                              </p>
                            </div>
                          )}

                          {leetCodeData?.languageStats?.matchedUser
                            ?.languageProblemCount?.length > 6 && (
                            <div className="text-center mt-2">
                              <span className="text-xs text-primary hover:underline cursor-pointer">
                                +
                                {leetCodeData.languageStats.matchedUser
                                  .languageProblemCount.length - 6}{" "}
                                more languages
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="mb-6">
                      <div className="bg-gradient-to-r from-background to-background/80 p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-all">
                        <div className="flex flex-col space-y-4">
                          <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2">
                            <h4 className="text-sm uppercase tracking-wider text-muted-foreground/70">
                              Badges & Achievements
                            </h4>
                            <div className="flex items-center gap-2">
                              <span className="text-xs px-2 py-0.5 rounded bg-primary/5 text-primary flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-3 w-3 mr-1"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                Earned
                              </span>
                            </div>
                          </div>

                          {leetCodeData?.badges?.badgesCount > 0 &&
                          leetCodeData.badges.badges ? (
                            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                              {leetCodeData.badges.badges.map((badge, i) => (
                                <div
                                  key={i}
                                  className="flex flex-col items-center p-4 bg-muted/30 rounded-xl border border-border hover:border-primary/30 hover:bg-primary/5 transition-all group"
                                >
                                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                    {badge.icon ? (
                                      badge.icon.includes("http") ? (
                                        <Image
                                          src={badge.icon}
                                          alt={`${badge.displayName} badge`}
                                          width={32}
                                          height={32}
                                          className="object-contain"
                                        />
                                      ) : (
                                        <span
                                          className="w-6 h-6 flex items-center justify-center"
                                          dangerouslySetInnerHTML={{
                                            __html: badge.icon,
                                          }}
                                        />
                                      )
                                    ) : (
                                      <FaCheckCircle className="w-6 h-6 text-primary" />
                                    )}
                                  </div>
                                  <div className="text-center">
                                    <div className="font-medium text-sm mb-1">
                                      {badge.displayName}
                                    </div>
                                    {badge.category && (
                                      <span className="text-xs text-muted-foreground">
                                        {badge.category}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="bg-background p-6 rounded-lg border border-border text-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 mx-auto text-muted-foreground/30 mb-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                />
                              </svg>
                              <p className="text-base text-muted-foreground">
                                No badges earned yet
                              </p>
                              <p className="text-sm text-muted-foreground/70 mt-1">
                                Complete challenges to earn badges
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* LeetCode Profile Link */}
                {codingChallenges.leetcode.link && (
                  <div className="flex justify-center mt-6">
                    <motion.a
                      href={codingChallenges.leetcode.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-gradient-to-r from-primary/80 to-accent/80 hover:from-primary hover:to-accent text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <FaLeetcode className="text-lg" /> View Full LeetCode
                      Profile
                    </motion.a>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </section>

        {/* Technical Articles Section */}
        <section>
          <div className="flex items-center flex-wrap gap-3 mb-8">
            <div className="p-2 rounded-full bg-primary/10">
              <FaNewspaper className="text-primary text-xl" />
            </div>
            <h2 className="text-2xl font-bold">Published Technical Articles</h2>
            <Link
              href="https://www.geeksforgeeks.org/user/elitecoder/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 inline-flex items-center gap-1.5 bg-gradient-to-r from-primary/80 to-accent/80 hover:from-primary hover:to-accent text-white text-xs px-3 py-1.5 rounded-md shadow-sm hover:shadow transition-all"
            >
              <SiGeeksforgeeks className="text-sm" /> GFG Profile
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles?.map((article, idx) => (
              <motion.a
                key={idx}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-b from-muted/50 to-muted rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 block group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                <div className="p-6 relative">
                  {/* Decorative element */}
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary/40 to-accent/40 group-hover:from-primary group-hover:to-accent transition-all duration-300"></div>
                  <div className="pl-3 flex flex-col">
                    <div className="flex flex-col xs:flex-row xs:items-start xs:justify-between gap-2 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-primary/5 rounded-full flex items-center justify-center">
                          <SiGeeksforgeeks className="text-primary text-lg" />
                        </div>
                        <span className="text-sm font-medium">
                          {article.platform}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs bg-primary/5 text-primary px-2 py-0.5 rounded-full">
                          {article.date}
                        </span>
                      </div>
                    </div>

                    <div className="mb-2">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors leading-tight">
                        {article.title}
                      </h3>

                      <div className="flex flex-wrap gap-1 mt-2">
                        {article.topic && (
                          <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                            {article.topic}
                          </span>
                        )}
                        <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          {article.author || "Tushar Singh"}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {article.description}
                    </p>

                    <div className="flex items-center gap-2 text-primary font-medium text-sm mt-auto group-hover:gap-3 transition-all">
                      <FaExternalLinkAlt className="group-hover:animate-pulse" />{" "}
                      Read Full Article
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0 transition-all"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

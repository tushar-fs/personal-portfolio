import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import { FiDownload, FiExternalLink } from "react-icons/fi";
import AnimatedButton from "@/components/AnimatedButton";

export default function ResumePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Handle iframe load events
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setError(true);
  };

  return (
    <>
      <Head>
        <title>Resume | Tushar Singh</title>
        <meta
          name="description"
          content="View and download Tushar Singh's professional resume"
        />
      </Head>

      <main className="w-[60%] mx-auto mt-24 md:mt-32 px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start"
        >
          <h1 className="text-4xl font-bold mb-6">Resume</h1>

          <div className="w-full mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <p className="text-muted-foreground">
              View my professional experience, education, and skills in detail.
            </p>

            <div className="flex gap-3">
              <a href="/resume.pdf" download="Tushar_Singh_Resume.pdf">
                <AnimatedButton className="flex items-center gap-2">
                  <FiDownload /> Download PDF
                </AnimatedButton>
              </a>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                <AnimatedButton
                  color="secondary"
                  className="flex items-center gap-2"
                >
                  <FiExternalLink /> Open in New Tab
                </AnimatedButton>
              </a>
            </div>
          </div>

          {/* PDF Container with responsive height */}
          <div className="w-full bg-muted rounded-lg border border-border overflow-hidden relative">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                <div className="text-center p-6">
                  <p className="text-red-500 font-bold mb-2">
                    Could not load PDF
                  </p>
                  <p className="text-muted-foreground">
                    Please try downloading the file instead.
                  </p>
                </div>
              </div>
            )}

            <iframe
              src="/resume.pdf"
              className="w-full h-[115vh] border-none"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              title="Resume"
            />
          </div>
        </motion.div>
      </main>
    </>
  );
}

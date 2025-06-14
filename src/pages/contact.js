import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiUser, FiMessageSquare } from "react-icons/fi";
import AnimatedButton from "@/components/AnimatedButton";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null },
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus((prevStatus) => ({ ...prevStatus, submitting: true }));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.status === 200) {
        setFormData({ name: "", email: "", subject: "", message: "" });
        setStatus({
          submitted: true,
          submitting: false,
          info: { error: false, msg: data.message },
        });
      } else {
        setStatus({
          submitted: false,
          submitting: false,
          info: {
            error: true,
            msg: data.message || "Something went wrong. Please try again.",
          },
        });
      }
    } catch (error) {
      console.error(error);
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg: "Something went wrong. Please try again." },
      });
    }
  };

  return (
    <main className="max-w-4xl mx-auto mt-16 sm:mt-20 md:mt-32 px-4 sm:px-6 mb-20 sm:mb-24">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          Get in Touch
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8">
          Have a question or want to work together? Fill out the form below and
          I&apos;ll get back to you as soon as possible.
        </p>

        {status.submitted ? (
          <motion.div
            className="bg-primary/10 border border-primary p-4 sm:p-6 rounded-lg text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <FiMail className="mx-auto text-3xl sm:text-4xl text-primary mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-bold mb-2">Message Sent!</h3>
            <p className="text-muted-foreground text-sm sm:text-base">
              Thank you for reaching out. I&apos;ll get back to you soon.
            </p>
            <AnimatedButton
              onClick={() =>
                setStatus((prev) => ({ ...prev, submitted: false }))
              }
              className="mt-4 text-sm sm:text-base"
            >
              Send Another Message
            </AnimatedButton>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-1 sm:space-y-2">
                <label
                  htmlFor="name"
                  className="block text-xs sm:text-sm font-medium"
                >
                  Your Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-muted-foreground text-sm sm:text-base" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="block w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-3 text-sm border border-border rounded-md bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div className="space-y-1 sm:space-y-2">
                <label
                  htmlFor="email"
                  className="block text-xs sm:text-sm font-medium"
                >
                  Your Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-muted-foreground text-sm sm:text-base" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="block w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-3 text-sm border border-border rounded-md bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1 sm:space-y-2">
              <label
                htmlFor="subject"
                className="block text-xs sm:text-sm font-medium"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="block w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-border rounded-md bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="What's this about?"
              />
            </div>

            <div className="space-y-1 sm:space-y-2">
              <label
                htmlFor="message"
                className="block text-xs sm:text-sm font-medium"
              >
                Message
              </label>
              <div className="relative">
                <div className="absolute top-2 sm:top-3 left-3 pointer-events-none">
                  <FiMessageSquare className="text-muted-foreground text-sm sm:text-base" />
                </div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="block w-full pl-9 sm:pl-10 pr-3 py-2 sm:py-3 text-sm border border-border rounded-md bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Your message here..."
                ></textarea>
              </div>
            </div>

            <div className="text-right">
              <AnimatedButton
                type="submit"
                disabled={status.submitting}
                className="text-sm sm:text-base py-2 px-4 sm:py-2 sm:px-6"
              >
                {status.submitting ? "Sending..." : "Send Message"}
              </AnimatedButton>
            </div>

            {status.info.error && (
              <div className="p-3 sm:p-4 bg-red-50 border border-red-300 text-red-700 rounded-md text-sm">
                <p>{status.info.msg}</p>
              </div>
            )}
          </form>
        )}
      </motion.section>
    </main>
  );
}

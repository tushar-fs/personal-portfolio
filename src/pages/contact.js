import { useState, useRef } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiMail,
  FiUser,
  FiMessageSquare,
  FiPaperclip,
  FiX,
} from "react-icons/fi";
import AnimatedButton from "@/components/AnimatedButton";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [attachment, setAttachment] = useState(null);
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null },
  });
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      // 5MB limit
      setStatus({
        ...status,
        info: { error: true, msg: "File size exceeds 5MB limit" },
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setAttachment(null);
    } else {
      setStatus({
        ...status,
        info: { error: false, msg: null },
      });
      setAttachment(file);
    }
  };

  const removeAttachment = () => {
    setAttachment(null);
    // Reset the file input if it exists
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus((prevStatus) => ({ ...prevStatus, submitting: true }));

    try {
      // Create a FormData object to handle file uploads
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("subject", formData.subject);
      formDataToSend.append("message", formData.message);

      if (attachment) {
        formDataToSend.append("attachment", attachment);
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        // No Content-Type header when using FormData
        body: formDataToSend,
      });

      const data = await res.json();

      if (res.status === 200) {
        setFormData({ name: "", email: "", subject: "", message: "" });
        setAttachment(null);
        // Reset file input safely
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
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
    <>
      <Head>
        <title>Contact | Tushar Singh</title>
        <meta
          name="description"
          content="Get in touch with Tushar Singh - Software Engineer and Full Stack Developer. Available for opportunities and collaborations."
        />
      </Head>
      <main className="max-w-4xl mx-auto mt-20 sm:mt-24 md:mt-32 px-4 sm:px-6 mb-20 sm:mb-24">
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
            Have a question or want to work together? Fill out the form below
            and I&apos;ll get back to you as soon as possible.
          </p>

          {status.submitted ? (
            <motion.div
              className="bg-primary/10 border border-primary p-4 sm:p-6 rounded-lg text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <FiMail className="mx-auto text-3xl sm:text-4xl text-primary mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-bold mb-2">
                Message Sent!
              </h3>
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
            <form
              onSubmit={handleSubmit}
              className="space-y-4 sm:space-y-6"
              encType="multipart/form-data"
            >
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

              <div className="space-y-1 sm:space-y-2">
                <label
                  htmlFor="attachment"
                  className="block text-xs sm:text-sm font-medium"
                >
                  Attachment (optional)
                </label>
                {!attachment ? (
                  <>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiPaperclip className="text-muted-foreground text-sm sm:text-base" />
                      </div>
                      <input
                        type="file"
                        id="attachment"
                        ref={fileInputRef}
                        name="attachment"
                        onChange={handleFileChange}
                        className="block w-full pl-9 sm:pl-10 pr-3 py-1.5 sm:py-2 text-sm border border-border rounded-md bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90 cursor-pointer"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Max file size: 5MB. Accepted formats: PDF, DOC, DOCX, JPG,
                      PNG, TXT
                    </p>
                  </>
                ) : (
                  <div className="flex items-center gap-2 p-2 bg-primary/10 border border-primary/30 rounded-md">
                    <div className="flex-1 flex items-center gap-2">
                      <FiPaperclip className="text-primary text-sm sm:text-base" />
                      <span className="text-sm font-medium truncate">
                        {attachment.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({Math.round(attachment.size / 1024)} KB)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={removeAttachment}
                      className="p-1 rounded-full hover:bg-primary/20 transition-colors"
                      aria-label="Remove attachment"
                    >
                      <FiX className="text-primary" />
                    </button>
                  </div>
                )}
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
    </>
  );
}

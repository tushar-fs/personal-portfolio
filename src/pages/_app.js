import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { Roboto_Mono } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <ThemeProvider>
      <div
        className={`min-h-screen bg-background flex flex-col ${robotoMono.className}`}
      >
        <Navbar />
        <div className="flex-grow pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={router.route}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Component {...pageProps} />
            </motion.div>
          </AnimatePresence>
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

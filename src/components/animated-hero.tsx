"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const rotatingTexts = [
  "Creative Technologist",
  "Cat Dad",
  "DJ",
  "Music Producer",
  "Gamer",
  "Techno",
  "Street Fighter II",
  "Baile Funk",
  "Go Vegan"
];

export default function AnimatedHero() {
  const [rotatingText, setRotatingText] = useState("Creative Technologist");
  const [textIndex, setTextIndex] = useState(0);
  const { scrollYProgress } = useScroll();

  // Parallax effect for Portfolio text (moves slower than scroll)
  const portfolioY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const portfolioOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Rotate text with fade cross-dissolve every 2 seconds
  useEffect(() => {
    const rotateInterval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 2000);

    return () => clearInterval(rotateInterval);
  }, []);

  useEffect(() => {
    setRotatingText(rotatingTexts[textIndex]);
  }, [textIndex]);

  return (
    <section
      id="work"
      className="h-screen flex items-center justify-center px-6 md:px-12 relative overflow-hidden"
    >
      {/* Left Side - Feed Link with bounce animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5, type: "spring", stiffness: 100 }}
        className="absolute left-6 md:left-12 bottom-12 md:bottom-16"
      >
        <a
          href="#portfolio"
          className="text-base hover:opacity-70 transition-opacity flex items-center gap-1 group"
        >
          Feed{" "}
          <motion.span
            className="inline-block"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
        </a>
      </motion.div>

      {/* Center - Main Content */}
      <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto">
        {/* Video Character with breathing effect and entrance animation */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 md:mb-12"
        >
          <div className="h-[14.4rem] md:h-[19.2rem] lg:h-[24rem] flex items-end justify-center">
            <motion.video
              animate={{ scale: [1.0, 1.02, 1.0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-auto object-contain scale-110"
            >
              <source src="/bb6ef961-60d3-4086-a932-b948896e3347.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </motion.video>
          </div>
        </motion.div>

        {/* Subtitle with fade-in delay and rotating text with cross-dissolve */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center max-w-2xl"
        >
          <p className="text-base md:text-lg lg:text-xl opacity-60 font-normal">
            Operations Director, AI Specialist &{" "}
            <AnimatePresence mode="wait">
              <motion.span
                key={textIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="inline-block"
              >
                {rotatingText}
              </motion.span>
            </AnimatePresence>
          </p>
        </motion.div>
      </div>

      {/* Bottom Right - Portfolio Text with parallax and slide-right entrance */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        style={{ y: portfolioY, opacity: portfolioOpacity }}
        className="absolute right-6 md:right-12 bottom-8 md:bottom-12 text-right pointer-events-none select-none"
      >
        <h2 className="text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] font-bold leading-none tracking-tight">
          Portfolio
        </h2>
      </motion.div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

interface TextSplitAnimationProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  type?: "words" | "chars" | "lines";
  animationType?: "fade" | "slide" | "scale" | "rotate" | "blur";
}

export default function TextSplitAnimation({
  text,
  className = "",
  delay = 0,
  staggerDelay = 0.03,
  type = "chars",
  animationType = "fade",
}: TextSplitAnimationProps) {
  // Split text based on type
  const elements =
    type === "words"
      ? text.split(" ")
      : type === "chars"
      ? text.split("")
      : text.split("\n");

  // Animation variants based on type
  const getVariants = () => {
    const baseTransition = {
      duration: 0.5,
      ease: [0.6, 0.01, 0.05, 0.95],
    };

    switch (animationType) {
      case "fade":
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
      case "slide":
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        };
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0 },
          visible: { opacity: 1, scale: 1 },
        };
      case "rotate":
        return {
          hidden: { opacity: 0, rotateX: -90 },
          visible: { opacity: 1, rotateX: 0 },
        };
      case "blur":
        return {
          hidden: { opacity: 0, filter: "blur(10px)" },
          visible: { opacity: 1, filter: "blur(0px)" },
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        };
    }
  };

  const variants = getVariants();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {elements.map((element, index) => (
        <motion.span
          key={index}
          variants={variants}
          className="inline-block"
          style={{
            transformOrigin: "center",
            ...(type === "words" && { marginRight: "0.25em" }),
          }}
        >
          {element === " " ? "\u00A0" : element}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Advanced split text with custom animations
interface AdvancedTextSplitProps {
  text: string;
  className?: string;
  highlightWords?: number[];
  animateOnHover?: boolean;
}

export function AdvancedTextSplit({
  text,
  className = "",
  highlightWords = [],
  animateOnHover = false,
}: AdvancedTextSplitProps) {
  const words = text.split(" ");

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {words.map((word, wordIndex) => (
        <motion.span
          key={wordIndex}
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: wordIndex * 0.05, duration: 0.5 }}
        >
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className={`inline-block ${
                highlightWords.includes(wordIndex)
                  ? "text-white font-bold"
                  : ""
              }`}
              whileHover={
                animateOnHover
                  ? {
                      scale: 1.2,
                      color: "#ffffff",
                      transition: { duration: 0.2 },
                    }
                  : undefined
              }
              style={{
                transformOrigin: "center",
                display: "inline-block",
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      ))}
    </motion.div>
  );
}

// Wave text animation
export function WaveText({ text, className = "" }: { text: string; className?: string }) {
  const chars = text.split("");

  return (
    <motion.div className={className}>
      {chars.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ y: 0 }}
          whileInView={{
            y: [0, -10, 0],
          }}
          transition={{
            delay: index * 0.05,
            duration: 0.6,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut",
          }}
          viewport={{ once: false }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
}

// Scramble text animation
export function ScrambleText({ text, className = "" }: { text: string; className?: string }) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: index * 0.05,
            duration: 0.5,
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EasterEggs() {
  const [konamiActive, setKonamiActive] = useState(false);
  const [konamiIndex, setKonamiIndex] = useState(0);

  // Konami code: ↑ ↑ ↓ ↓ ← → ← → B A
  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const expected = konamiCode[konamiIndex].toLowerCase();

      if (key === expected) {
        const newIndex = konamiIndex + 1;
        if (newIndex === konamiCode.length) {
          setKonamiActive(true);
          setKonamiIndex(0);
          setTimeout(() => setKonamiActive(false), 5000);
        } else {
          setKonamiIndex(newIndex);
        }
      } else {
        setKonamiIndex(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [konamiIndex]);

  return (
    <AnimatePresence>
      {konamiActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] pointer-events-none flex items-center justify-center"
        >
          {/* Rainbow spinning border */}
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0"
            style={{
              background:
                "conic-gradient(from 0deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3, #ff0000)",
            }}
          />

          {/* Center message */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, ease: "backOut" }}
            className="relative z-10 bg-black p-12 border-4 border-white"
          >
            <motion.h2
              animate={{
                color: [
                  "#ff0000",
                  "#ff7f00",
                  "#ffff00",
                  "#00ff00",
                  "#0000ff",
                  "#4b0082",
                  "#9400d3",
                  "#ff0000",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="text-6xl font-bold text-center"
            >
              🎮 KONAMI! 🎮
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-center mt-4 text-white"
            >
              You found the secret!
            </motion.p>
          </motion.div>

          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: 0,
                y: 0,
                scale: 0,
                opacity: 1,
              }}
              animate={{
                x: Math.random() * 400 - 200,
                y: Math.random() * 400 - 200,
                scale: Math.random() * 2 + 1,
                opacity: 0,
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className="absolute w-4 h-4 rounded-full"
              style={{
                background: [
                  "#ff0000",
                  "#ff7f00",
                  "#ffff00",
                  "#00ff00",
                  "#0000ff",
                  "#4b0082",
                  "#9400d3",
                ][i % 7],
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

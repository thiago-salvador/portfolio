"use client";

import { motion } from "framer-motion";

interface AnimatedGradientProps {
  className?: string;
  type?: "mesh" | "radial" | "linear" | "conic";
  speed?: "slow" | "medium" | "fast";
}

export default function AnimatedGradient({
  className = "",
  type = "mesh",
  speed = "medium",
}: AnimatedGradientProps) {
  const speedValues = {
    slow: 20,
    medium: 10,
    fast: 5,
  };

  const duration = speedValues[speed];

  if (type === "mesh") {
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(at 0% 0%, rgba(255, 0, 100, 0.1) 0%, transparent 50%), radial-gradient(at 100% 0%, rgba(100, 0, 255, 0.1) 0%, transparent 50%), radial-gradient(at 100% 100%, rgba(0, 255, 200, 0.1) 0%, transparent 50%), radial-gradient(at 0% 100%, rgba(255, 200, 0, 0.1) 0%, transparent 50%)",
              "radial-gradient(at 100% 0%, rgba(255, 0, 100, 0.1) 0%, transparent 50%), radial-gradient(at 0% 100%, rgba(100, 0, 255, 0.1) 0%, transparent 50%), radial-gradient(at 0% 0%, rgba(0, 255, 200, 0.1) 0%, transparent 50%), radial-gradient(at 100% 100%, rgba(255, 200, 0, 0.1) 0%, transparent 50%)",
              "radial-gradient(at 100% 100%, rgba(255, 0, 100, 0.1) 0%, transparent 50%), radial-gradient(at 0% 0%, rgba(100, 0, 255, 0.1) 0%, transparent 50%), radial-gradient(at 100% 0%, rgba(0, 255, 200, 0.1) 0%, transparent 50%), radial-gradient(at 0% 100%, rgba(255, 200, 0, 0.1) 0%, transparent 50%)",
              "radial-gradient(at 0% 100%, rgba(255, 0, 100, 0.1) 0%, transparent 50%), radial-gradient(at 100% 100%, rgba(100, 0, 255, 0.1) 0%, transparent 50%), radial-gradient(at 0% 0%, rgba(0, 255, 200, 0.1) 0%, transparent 50%), radial-gradient(at 100% 0%, rgba(255, 200, 0, 0.1) 0%, transparent 50%)",
              "radial-gradient(at 0% 0%, rgba(255, 0, 100, 0.1) 0%, transparent 50%), radial-gradient(at 100% 0%, rgba(100, 0, 255, 0.1) 0%, transparent 50%), radial-gradient(at 100% 100%, rgba(0, 255, 200, 0.1) 0%, transparent 50%), radial-gradient(at 0% 100%, rgba(255, 200, 0, 0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    );
  }

  if (type === "radial") {
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)",
              "radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)",
              "radial-gradient(circle at 70% 60%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 70%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)",
              "radial-gradient(circle at 60% 30%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)",
            ],
            scale: [1, 1.2, 1.1, 1.3, 1.15, 1],
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    );
  }

  if (type === "linear") {
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          style={{
            background:
              "linear-gradient(45deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.02) 100%)",
            backgroundSize: "200% 200%",
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    );
  }

  if (type === "conic") {
    return (
      <div className={`absolute inset-0 overflow-hidden ${className}`}>
        <motion.div
          className="absolute inset-0"
          animate={{
            rotate: [0, 360],
          }}
          style={{
            background:
              "conic-gradient(from 0deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))",
          }}
          transition={{
            duration: duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    );
  }

  return null;
}

// Gradient text animation
export function GradientText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <motion.span
      className={`bg-clip-text text-transparent ${className}`}
      animate={{
        backgroundImage: [
          "linear-gradient(90deg, #ffffff 0%, #888888 50%, #ffffff 100%)",
          "linear-gradient(90deg, #888888 0%, #ffffff 50%, #888888 100%)",
          "linear-gradient(90deg, #ffffff 0%, #888888 50%, #ffffff 100%)",
        ],
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        backgroundSize: "200% 100%",
      }}
    >
      {text}
    </motion.span>
  );
}

// Animated border gradient
export function AnimatedBorderGradient({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute -inset-[1px] rounded-lg opacity-50"
        animate={{
          background: [
            "linear-gradient(0deg, #ff0080, #ff8c00, #40e0d0, #ff0080)",
            "linear-gradient(90deg, #ff0080, #ff8c00, #40e0d0, #ff0080)",
            "linear-gradient(180deg, #ff0080, #ff8c00, #40e0d0, #ff0080)",
            "linear-gradient(270deg, #ff0080, #ff8c00, #40e0d0, #ff0080)",
            "linear-gradient(360deg, #ff0080, #ff8c00, #40e0d0, #ff0080)",
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <div className="relative bg-black rounded-lg">{children}</div>
    </div>
  );
}

// Floating orbs background
export function FloatingOrbs({ className = "" }: { className?: string }) {
  const orbs = [
    { size: 300, duration: 20, delay: 0, color: "rgba(255, 0, 100, 0.1)" },
    { size: 400, duration: 25, delay: 5, color: "rgba(100, 0, 255, 0.1)" },
    { size: 350, duration: 22, delay: 10, color: "rgba(0, 255, 200, 0.1)" },
  ];

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full blur-3xl"
          style={{
            width: orb.size,
            height: orb.size,
            background: orb.color,
          }}
          animate={{
            x: ["0%", "100%", "0%"],
            y: ["0%", "100%", "0%"],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

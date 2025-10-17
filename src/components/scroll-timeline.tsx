"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ScrollTimelineProps {
  children: React.ReactNode;
  className?: string;
}

export default function ScrollTimeline({ children, className = "" }: ScrollTimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Smooth spring animation for scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Transform values based on scroll
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);
  const rotate = useTransform(smoothProgress, [0, 0.5, 1], [-5, 0, 5]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, y, rotate }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Advanced timeline with multiple elements
interface TimelineItem {
  content: React.ReactNode;
  duration?: number;
}

interface AdvancedScrollTimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function AdvancedScrollTimeline({ items, className = "" }: AdvancedScrollTimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Progress line */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-white/20 to-transparent"
        style={{
          scaleY: smoothProgress,
          transformOrigin: "top",
        }}
      />

      {/* Timeline items */}
      <div className="space-y-24 pl-12">
        {items.map((item, index) => {
          const start = index / items.length;
          const end = (index + 1) / items.length;

          const itemOpacity = useTransform(
            smoothProgress,
            [start - 0.1, start, end, end + 0.1],
            [0, 1, 1, 0]
          );

          const itemX = useTransform(
            smoothProgress,
            [start - 0.1, start, end, end + 0.1],
            [-50, 0, 0, 50]
          );

          return (
            <motion.div
              key={index}
              style={{ opacity: itemOpacity, x: itemX }}
              className="relative"
            >
              {/* Timeline dot */}
              <motion.div
                className="absolute -left-[49px] top-0 w-3 h-3 rounded-full bg-white"
                style={{
                  scale: useTransform(
                    smoothProgress,
                    [start, start + 0.05, end - 0.05, end],
                    [0, 1.5, 1.5, 0]
                  ),
                }}
              />

              {item.content}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

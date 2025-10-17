"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: ReactNode;
}

export default function PullToRefresh({ onRefresh, children }: PullToRefreshProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const y = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const pullThreshold = 80;
  const maxPull = 120;

  // Transform pull distance to rotation
  const rotation = useTransform(y, [0, maxPull], [0, 360]);
  const opacity = useTransform(y, [0, pullThreshold], [0, 1]);
  const scale = useTransform(y, [0, pullThreshold, maxPull], [0.5, 1, 1.2]);

  // Haptic feedback
  const triggerHaptic = (type: "light" | "medium" | "heavy" = "light") => {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      const patterns = {
        light: 10,
        medium: 20,
        heavy: 30,
      };
      navigator.vibrate(patterns[type]);
    }
  };

  const handleDragStart = () => {
    if (isRefreshing) return;

    // Only allow pull if at top of page
    const isAtTop = window.scrollY === 0;
    if (isAtTop) {
      setIsPulling(true);
    }
  };

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (isRefreshing || !isPulling) return;

    const isAtTop = window.scrollY === 0;
    if (!isAtTop) {
      setIsPulling(false);
      return;
    }

    // Only allow downward pull
    if (info.offset.y > 0) {
      const clampedY = Math.min(info.offset.y, maxPull);
      y.set(clampedY);

      // Trigger haptic at threshold
      if (clampedY >= pullThreshold && !isRefreshing) {
        triggerHaptic("light");
      }
    }
  };

  const handleDragEnd = async (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (isRefreshing || !isPulling) return;

    setIsPulling(false);

    if (info.offset.y >= pullThreshold) {
      // Trigger refresh
      setIsRefreshing(true);
      triggerHaptic("medium");

      try {
        await onRefresh();
      } catch (error) {
        console.error("Refresh failed:", error);
      } finally {
        // Animate back
        y.set(0);
        setTimeout(() => {
          setIsRefreshing(false);
        }, 500);
      }
    } else {
      // Snap back
      y.set(0);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Pull indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-center pointer-events-none"
        style={{
          y,
          opacity,
        }}
      >
        <motion.div
          className="flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-lg rounded-full mt-20"
          style={{ scale }}
        >
          {isRefreshing ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
            />
          ) : (
            <motion.svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ rotate: rotation }}
            >
              <path
                d="M12 5V19M12 5L6 11M12 5L18 11"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          )}
        </motion.div>
      </motion.div>

      {/* Content wrapper */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0.3, bottom: 0 }}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        style={{ y: isRefreshing ? 0 : undefined }}
        className="touch-pan-y"
      >
        {children}
      </motion.div>
    </div>
  );
}

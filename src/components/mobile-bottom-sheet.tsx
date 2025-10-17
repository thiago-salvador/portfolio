"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, PanInfo, useMotionValue, useTransform } from "framer-motion";
import type { PortfolioProject } from "@/types/portfolio";
import ProjectMedia from "./project-media";

interface MobileBottomSheetProps {
  project: PortfolioProject | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileBottomSheet({ project, isOpen, onClose }: MobileBottomSheetProps) {
  const [isDragging, setIsDragging] = useState(false);
  const y = useMotionValue(0);
  const opacity = useTransform(y, [0, 300], [1, 0]);

  // Haptic feedback helper
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

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        triggerHaptic("light");
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);

    // If dragged down more than 150px, close the sheet
    if (info.offset.y > 150) {
      triggerHaptic("medium");
      onClose();
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
    triggerHaptic("light");
  };

  const handleClose = () => {
    triggerHaptic("light");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/80"
            onClick={handleClose}
            style={{ WebkitBackdropFilter: "blur(8px)" }}
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            style={{ y, opacity }}
            className="fixed bottom-0 left-0 right-0 z-[101] bg-black border-t border-white/10 rounded-t-3xl max-h-[90vh] overflow-hidden"
          >
            {/* Drag Handle */}
            <div className="sticky top-0 z-20 bg-black/90 backdrop-blur-lg pt-3 pb-2">
              <motion.div
                className="w-12 h-1.5 bg-white/30 rounded-full mx-auto"
                animate={{
                  scaleX: isDragging ? 1.2 : 1,
                  backgroundColor: isDragging ? "rgba(255, 255, 255, 0.6)" : "rgba(255, 255, 255, 0.3)",
                }}
                transition={{ duration: 0.2 }}
              />
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-3rem)] overscroll-contain">
              {/* Project Image */}
              <div className="aspect-video bg-neutral-900 overflow-hidden">
                <ProjectMedia
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  autoPlay={true}
                />
              </div>

              {/* Project Details */}
              <div className="p-6 pb-12">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.6, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-xs font-mono mb-3"
                >
                  {project.tag}
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-2xl md:text-3xl font-bold mb-3"
                >
                  {project.title}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.6, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-sm mb-4"
                >
                  {project.category}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.8, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="text-base leading-relaxed mb-6"
                >
                  {project.description}
                </motion.p>

                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 0.7, scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                        whileTap={{ scale: 0.95 }}
                        onTapStart={() => triggerHaptic("light")}
                        className="text-xs px-3 py-1.5 border border-white/10 rounded-full"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                )}

                {project.slug && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    whileTap={{ scale: 0.95 }}
                    onTapStart={() => triggerHaptic("medium")}
                    className="w-full py-4 bg-white text-black font-medium rounded-full active:bg-white/90 transition-colors"
                  >
                    View Full Project
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

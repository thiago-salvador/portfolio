"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { PortfolioProject } from "@/types/portfolio";
import ProjectMedia from "./project-media";

interface ProjectModalProps {
  project: PortfolioProject | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const router = useRouter();
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
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

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Create ripple effect at click position
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { x, y, id }]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);

    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && project && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/90 overflow-hidden"
            onClick={handleBackdropClick}
            style={{ WebkitBackdropFilter: "blur(8px)" }}
          >
            {/* Ripple effects */}
            {ripples.map((ripple) => (
              <motion.div
                key={ripple.id}
                initial={{ scale: 0, opacity: 0.6 }}
                animate={{ scale: 4, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute w-32 h-32 bg-white rounded-full pointer-events-none"
                style={{
                  left: ripple.x - 64,
                  top: ripple.y - 64,
                }}
              />
            ))}
          </motion.div>

          {/* Modal Content */}
          <motion.div
            layoutId={`project-${project.id}`}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
            className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto mx-4 bg-black border border-white/10 rounded-lg"
          >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all rounded-full group"
          aria-label="Close modal"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="group-hover:rotate-90 transition-transform duration-300"
          >
            <path
              d="M15 5L5 15M5 5L15 15"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Project Image */}
        <div className="aspect-[21/9] bg-neutral-900 overflow-hidden rounded-t-lg">
          <ProjectMedia
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            autoPlay={true}
          />
        </div>

        {/* Project Details */}
        <div className="p-8 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-xs font-mono mb-4"
          >
            {project.tag}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            {project.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-sm mb-6"
          >
            {project.category}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="text-lg md:text-xl leading-relaxed mb-8"
          >
            {project.description}
          </motion.p>

          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.7, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.05, opacity: 1 }}
                  className="text-xs px-3 py-1.5 border border-white/10 rounded-full cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          )}

          {project.slug && (
            <div className="mt-8">
              <button
                onClick={() => {
                  onClose();
                  router.push(`/project/${project.slug}`);
                }}
                className="group relative inline-flex items-center gap-2 px-6 py-3 border border-white hover:bg-white hover:text-black transition-all overflow-hidden"
              >
                <span className="relative z-10">View Project</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="relative z-10 group-hover:translate-x-1 transition-transform duration-300"
                >
                  <path
                    d="M7 3L14 10L7 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {/* Ripple effect on click */}
                <span className="absolute inset-0 bg-white/20 scale-0 group-active:scale-100 transition-transform duration-300 rounded-sm" />
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
      )}
    </AnimatePresence>
  );
}

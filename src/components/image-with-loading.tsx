"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ImageWithLoadingProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ImageWithLoading({ src, alt, className = "" }: ImageWithLoadingProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-full">
      {/* Skeleton with shimmer effect */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-white/5 overflow-hidden">
          <motion.div
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          />
        </div>
      )}

      {/* Actual image with blur-up effect */}
      <motion.img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        initial={{ opacity: 0, filter: "blur(20px)" }}
        animate={{
          opacity: isLoaded ? 1 : 0,
          filter: isLoaded ? "blur(0px)" : "blur(20px)",
        }}
        transition={{ duration: 0.5 }}
        className={className}
      />
    </div>
  );
}

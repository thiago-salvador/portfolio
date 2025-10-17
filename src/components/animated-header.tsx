"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import MobileNavDrawer from "./mobile-nav-drawer";

export default function AnimatedHeader() {
  const [activeSection, setActiveSection] = useState("work");
  const [logoClicks, setLogoClicks] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const { scrollYProgress } = useScroll();

  // Transform scroll progress to blur value
  const blurValue = useTransform(scrollYProgress, [0, 0.1], [4, 20]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["work", "portfolio", "footer"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle logo clicks for confetti
  const handleLogoClick = () => {
    const newCount = logoClicks + 1;
    setLogoClicks(newCount);

    if (newCount >= 5) {
      setShowConfetti(true);
      setLogoClicks(0);
      setTimeout(() => setShowConfetti(false), 4000);
    }

    // Reset counter after 2 seconds of no clicks
    setTimeout(() => {
      setLogoClicks(0);
    }, 2000);
  };

  const navLinks = [
    { href: "#work", label: "Work" },
    { href: "#portfolio", label: "Projects" },
    { href: "#footer", label: "Contact" },
  ];

  return (
    <>
      {/* Mobile Navigation Drawer */}
      <MobileNavDrawer />

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-white/50 to-white/20 origin-left z-[60]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-4 md:py-5 flex items-center justify-between bg-black/30 border-b border-white/10"
        style={{
          backdropFilter: useTransform(blurValue, (v) => `blur(${v}px)`),
          WebkitBackdropFilter: useTransform(blurValue, (v) => `blur(${v}px)`),
        }}
      >
        {/* Logo */}
        <motion.div
          className="w-9 h-9 md:w-10 md:h-10 border border-white flex items-center justify-center font-medium text-sm cursor-pointer transition-all duration-300 relative"
          whileHover={{ rotate: 12, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogoClick}
        >
          TS
          {/* Click counter indicator */}
          {logoClicks > 0 && logoClicks < 5 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-white text-black text-[10px] flex items-center justify-center rounded-full font-bold"
            >
              {logoClicks}
            </motion.span>
          )}
        </motion.div>

        {/* Center Nav */}
        <nav className="hidden md:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-lg md:text-xl font-medium"
          >
            Thiago Salvador
          </motion.span>
        </nav>

        {/* Right Nav Links */}
        <nav className="hidden md:flex items-center gap-6 md:gap-8 text-base font-light">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1), duration: 0.5 }}
              className="relative"
            >
              <a
                href={link.href}
                className="relative inline-block py-1 transition-opacity hover:opacity-100 opacity-70 group"
              >
                {link.label}
                {/* Animated underline */}
                <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full" />

                {/* Active indicator dot */}
                {activeSection === link.href.substring(1) && (
                  <motion.span
                    layoutId="activeSection"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            </motion.div>
          ))}
        </nav>
      </motion.header>

      {/* Confetti Explosion */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 z-[250] pointer-events-none">
            {[...Array(100)].map((_, i) => {
              const colors = [
                "#ff0000",
                "#ff7f00",
                "#ffff00",
                "#00ff00",
                "#0000ff",
                "#4b0082",
                "#9400d3",
                "#ff1493",
                "#00ffff",
                "#ff69b4",
              ];
              const randomColor = colors[Math.floor(Math.random() * colors.length)];
              const randomX = Math.random() * window.innerWidth;
              const randomY = Math.random() * window.innerHeight;
              const randomSize = Math.random() * 15 + 5;
              const randomDuration = Math.random() * 2 + 1;
              const randomDelay = Math.random() * 0.5;
              const randomRotation = Math.random() * 360;
              const shapes = ["●", "■", "▲", "★", "♥", "◆"];
              const randomShape = shapes[Math.floor(Math.random() * shapes.length)];

              return (
                <motion.div
                  key={i}
                  initial={{
                    x: window.innerWidth / 2,
                    y: 100,
                    scale: 0,
                    opacity: 1,
                    rotate: 0,
                  }}
                  animate={{
                    x: randomX,
                    y: randomY,
                    scale: [0, 1, 1, 0],
                    opacity: [0, 1, 1, 0],
                    rotate: randomRotation,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{
                    duration: randomDuration,
                    delay: randomDelay,
                    ease: "easeOut",
                  }}
                  className="absolute"
                  style={{
                    fontSize: `${randomSize}px`,
                    color: randomColor,
                  }}
                >
                  {randomShape}
                </motion.div>
              );
            })}

            {/* Success message */}
            <motion.div
              initial={{ scale: 0, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease: "backOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
            >
              <div className="bg-black border-4 border-white p-8 text-center">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                  }}
                  className="text-6xl mb-4"
                >
                  🎉
                </motion.div>
                <h2 className="text-3xl font-bold mb-2">Celebration!</h2>
                <p className="text-lg opacity-70">You found the confetti!</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

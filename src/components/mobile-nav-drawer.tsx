"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { aboutText, socialLinks } from "@/data/about";

export default function MobileNavDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("work");

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

  const toggleDrawer = () => {
    triggerHaptic("light");
    setIsOpen(!isOpen);
  };

  const handleNavClick = (href: string) => {
    triggerHaptic("medium");
    setIsOpen(false);

    // Smooth scroll to section
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Close if dragged left more than 100px
    if (info.offset.x < -100) {
      triggerHaptic("light");
      setIsOpen(false);
    }
  };

  const navLinks = [
    { href: "#work", label: "Work", icon: "💼" },
    { href: "#portfolio", label: "Projects", icon: "🎨" },
    { href: "#footer", label: "Contact", icon: "📧" },
  ];

  return (
    <>
      {/* Hamburger Button - Only show on mobile */}
      <motion.button
        onClick={toggleDrawer}
        whileTap={{ scale: 0.9 }}
        className="md:hidden fixed top-5 right-6 z-[60] w-10 h-10 flex flex-col items-center justify-center gap-1.5"
        aria-label="Toggle menu"
      >
        <motion.span
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 8 : 0,
          }}
          className="w-6 h-0.5 bg-white transition-all"
        />
        <motion.span
          animate={{
            opacity: isOpen ? 0 : 1,
          }}
          className="w-6 h-0.5 bg-white transition-all"
        />
        <motion.span
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? -8 : 0,
          }}
          className="w-6 h-0.5 bg-white transition-all"
        />
      </motion.button>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[55] bg-black/60"
              onClick={toggleDrawer}
              style={{ WebkitBackdropFilter: "blur(12px)" }}
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={{ left: 0.2, right: 0 }}
              onDragEnd={handleDragEnd}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] z-[56] bg-black/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl overflow-y-auto"
              style={{ WebkitBackdropFilter: "blur(32px)" }}
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 border border-white flex items-center justify-center font-medium text-sm">
                    TS
                  </div>
                  <div>
                    <div className="font-bold">Thiago Salvador</div>
                    <div className="text-xs opacity-60">Product Generalist</div>
                  </div>
                </motion.div>
              </div>

              {/* Navigation Links */}
              <nav className="p-6 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    onClick={() => handleNavClick(link.href)}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full flex items-center gap-4 p-4 rounded-lg transition-all ${
                      activeSection === link.href.substring(1)
                        ? "bg-white/10 border border-white/20"
                        : "hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <span className="text-2xl">{link.icon}</span>
                    <span className="font-medium">{link.label}</span>
                    {activeSection === link.href.substring(1) && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="ml-auto w-2 h-2 bg-white rounded-full"
                      />
                    )}
                  </motion.button>
                ))}
              </nav>

              {/* Social Links */}
              <div className="p-6 border-t border-white/10">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ delay: 0.3 }}
                  className="text-xs mb-4"
                >
                  Connect with me
                </motion.div>
                <div className="space-y-2">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      whileTap={{ scale: 0.95 }}
                      onTapStart={() => triggerHaptic("light")}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-all group"
                    >
                      <span className="text-sm opacity-70 group-hover:opacity-100 transition-opacity">
                        {link.label}
                      </span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-auto opacity-40 group-hover:opacity-100 transition-opacity"
                      >
                        <path
                          d="M6 3L11 8L6 13"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 0.4 }}
                className="p-6 border-t border-white/10 text-xs text-center"
              >
                <a
                  href={`mailto:${aboutText.contact.email}`}
                  className="hover:opacity-100 transition-opacity block mb-2"
                  onClick={() => triggerHaptic("light")}
                >
                  {aboutText.contact.email}
                </a>
                <div>São Paulo, Brazil 🇧🇷</div>
              </motion.div>

              {/* Swipe indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                exit={{ opacity: 0 }}
                className="absolute top-1/2 left-4 -translate-y-1/2 text-xs pointer-events-none"
              >
                <motion.span
                  animate={{ x: [-5, 0, -5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ← Swipe
                </motion.span>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

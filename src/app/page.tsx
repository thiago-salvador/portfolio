"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { allProjects } from "@/data/projects";
import { aboutText, socialLinks } from "@/data/about";
import ProjectsAccordion from "@/components/projects-accordion";
import ProjectModal from "@/components/project-modal";
import ProjectMedia from "@/components/project-media";
import AnimatedHeader from "@/components/animated-header";
import AnimatedHero from "@/components/animated-hero";
import LoadingScreen from "@/components/loading-screen";
import EasterEggs from "@/components/easter-eggs";
import TextSplitAnimation from "@/components/text-split-animation";
import AnimatedGradient, { FloatingOrbs } from "@/components/animated-gradient";
import PullToRefresh from "@/components/pull-to-refresh";
import MobileBottomSheet from "@/components/mobile-bottom-sheet";
import type { PortfolioProject } from "@/types/portfolio";

export default function Home() {
  const [currentTime, setCurrentTime] = useState("");
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [clockTheme, setClockTheme] = useState(0);

  const clockThemes = [
    { color: "text-white", label: "DEFAULT" },
    { color: "text-red-500", label: "RED" },
    { color: "text-blue-500", label: "BLUE" },
    { color: "text-green-500", label: "GREEN" },
    { color: "text-yellow-500", label: "YELLOW" },
    { color: "text-purple-500", label: "PURPLE" },
    { color: "text-pink-500", label: "PINK" },
  ];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const ampm = hours >= 12 ? "PM" : "AM";
      const displayHours = hours % 12 || 12;
      setCurrentTime(
        `${displayHours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}${ampm}`,
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Select random project from all projects on mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * allProjects.length);
    setFeaturedIndex(randomIndex);
  }, []);

  // Set content loaded after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setContentLoaded(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const openProjectModal = (project: PortfolioProject) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const handleRefresh = async () => {
    // Simulate refresh with random featured project
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * allProjects.length);
        setFeaturedIndex(randomIndex);
        resolve();
      }, 1000);
    });
  };

  return (
    <>
      <LoadingScreen />
      <EasterEggs />
      <PullToRefresh onRefresh={handleRefresh}>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: contentLoaded ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="min-h-screen bg-black text-white relative"
      >
      {/* Animated Header */}
      <AnimatedHeader />

      {/* Animated Hero Section */}
      <AnimatedHero />

      {/* Projects Accordion */}
      <ProjectsAccordion />

      {/* Featured Section - Single Random Project */}
      <section className="px-6 md:px-12 py-24 relative">
        <AnimatedGradient type="mesh" speed="slow" className="opacity-30" />
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Featured Title with rotating arrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 0.7, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm mb-12 group/arrow cursor-default inline-block"
          >
            Featured{" "}
            <motion.span
              className="inline-block"
              whileHover={{ rotate: 45, y: 2 }}
              transition={{ duration: 0.3 }}
            >
              ↘
            </motion.span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={() => openProjectModal(allProjects[featuredIndex])}
            className="group block cursor-pointer relative"
          >
            {/* Image with slow zoom loop */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="aspect-[21/9] bg-neutral-900 mb-8 overflow-hidden rounded-lg relative"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="w-full h-full"
              >
                <ProjectMedia
                  src={allProjects[featuredIndex]?.image}
                  alt={allProjects[featuredIndex]?.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  autoPlay={true}
                />
              </motion.div>
              {/* Gradient overlay that shifts on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/20 transition-all duration-700" />
            </motion.div>

            {/* Text content with stagger and parallax */}
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.6, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-xs font-mono mb-3 group-hover:-translate-y-1 transition-transform duration-500"
              >
                {allProjects[featuredIndex]?.tag}
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-3xl md:text-4xl font-bold mb-3 group-hover:-translate-y-1 transition-transform duration-500"
              >
                {allProjects[featuredIndex]?.title}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.6, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-sm mb-4 group-hover:-translate-y-1 transition-transform duration-500"
              >
                {allProjects[featuredIndex]?.category}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.7, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="text-lg md:text-xl leading-relaxed group-hover:-translate-y-2 transition-transform duration-500"
              >
                {allProjects[featuredIndex]?.description}
              </motion.p>

              {allProjects[featuredIndex]?.tags && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {allProjects[featuredIndex].tags.map((tag, tagIndex) => (
                    <motion.span
                      key={tagIndex}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 0.7, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.4, delay: 0.8 + tagIndex * 0.05 }}
                      whileHover={{ scale: 1.05, opacity: 1 }}
                      className="text-xs px-3 py-1.5 border border-white/10 rounded-full"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              )}
            </div>

            {/* Custom cursor hint */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <span className="text-xs px-3 py-1.5 bg-white text-black rounded-full font-medium">
                View
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Facts Section */}
      <section className="px-6 md:px-12 py-24 border-t border-neutral-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 0.7, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm mb-16"
          >
            Facts ↘
          </motion.div>

          {/* Compact Biography with better design */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
            {/* Left Column - Keywords */}
            <div className="md:col-span-5 space-y-3">
              {aboutText.focus.map((focus, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 0.8, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group text-lg md:text-xl font-bold border-l-2 border-white/20 pl-4 hover:border-l-4 hover:border-white/60 hover:bg-white/5 transition-all duration-300 py-2 -ml-0 hover:-ml-2 cursor-default"
                >
                  {focus}
                </motion.div>
              ))}
            </div>

            {/* Right Column - Compact Text */}
            <div className="md:col-span-7 space-y-5 text-base md:text-lg opacity-90">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.9, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="leading-relaxed hover:leading-loose transition-all duration-300"
              >
                <TextSplitAnimation
                  text="With more than a decade of experience in technology and business, I have specialized in integrating artificial intelligence, automation, and design to create innovative solutions that drive measurable results for companies across various sectors."
                  type="words"
                  animationType="slide"
                  staggerDelay={0.02}
                />
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.9, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="leading-relaxed hover:leading-loose transition-all duration-300"
              >
                My approach combines strategic thinking with practical execution, allowing me to translate complex concepts into products and services that solve real problems and create tangible value for users and stakeholders.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.9, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="leading-relaxed hover:leading-loose transition-all duration-300"
              >
                As a Product Generalist, I work at the intersection of development, design, and strategy, using emerging technologies to create experiences that are both functional and engaging.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.9, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="leading-relaxed hover:leading-loose transition-all duration-300"
              >
                My work philosophy is centered on the idea that the best technology is the one that becomes invisible, allowing people to focus on what really matters: creating, connecting, and thriving in an increasingly digital world.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        id="footer"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="px-6 md:px-12 py-24 border-t border-neutral-800"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mb-24"
          >
            <div>
              <motion.a
                href={`mailto:${aboutText.contact.email}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="group text-2xl md:text-4xl font-bold block mb-4 relative inline-block hover:tracking-wider transition-all duration-300"
              >
                <span className="relative">
                  {aboutText.contact.email}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-500" />
                </span>
              </motion.a>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 0.6, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-lg"
              >
                Available in São Paulo, Brazil, or remotely surfing the World Wide Web of computers
              </motion.p>
            </div>
            <div className="flex flex-col space-y-2">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="group text-2xl md:text-4xl font-bold relative hover:tracking-wider transition-all duration-300"
                  style={{ width: 'fit-content' }}
                >
                  <span className="relative">
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-500" />
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center py-12 relative"
          >
            <div className="text-[10vw] md:text-[8vw] font-bold leading-none">
              @salvador_thiago
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center justify-between text-xs md:text-sm pt-8 border-t border-neutral-800"
          >
            <div>
              MADE WITH{" "}
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="inline-block"
              >
                ♥
              </motion.span>
              {" "}AND AI
            </div>
            <div className="text-center flex-1 opacity-60">
              Always Learning, Always Building
            </div>
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              onClick={() => setClockTheme((prev) => (prev + 1) % clockThemes.length)}
              className={`${clockThemes[clockTheme].color} cursor-pointer hover:scale-110 transition-transform relative group`}
              title="Click to change color"
            >
              {currentTime}
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] opacity-0 group-hover:opacity-60 transition-opacity whitespace-nowrap">
                {clockThemes[clockTheme].label}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </motion.footer>

      {/* Project Modal - Desktop */}
      <div className="hidden md:block">
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </div>

      {/* Mobile Bottom Sheet - Mobile only */}
      <div className="md:hidden">
        <MobileBottomSheet
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </div>
    </motion.main>
    </PullToRefresh>
    </>
  );
}

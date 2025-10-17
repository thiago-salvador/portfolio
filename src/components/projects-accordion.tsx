"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { aiProjects, operationsProjects, prototypeProjects, genAIProjects } from "@/data/projects";
import type { PortfolioProject } from "@/types/portfolio";
import ProjectModal from "./project-modal";
import ProjectMedia from "./project-media";

interface ProjectCategory {
  title: string;
  count: number;
  projects: PortfolioProject[];
}

const baseCategories = [
  { title: "AI Development", projects: aiProjects },
  { title: "Gen AI", projects: genAIProjects },
  { title: "Automations", projects: prototypeProjects },
  { title: "Operations", projects: operationsProjects },
] as const;

const categories: ProjectCategory[] = baseCategories.map(({ title, projects }) => ({
  title,
  projects,
  count: projects.length,
}));

const defaultCardsPerSlide = 4;
const cardGapPx = 16; // Tailwind gap-4
const totalProjects = categories.reduce((accumulator, category) => accumulator + category.count, 0);

export default function ProjectsAccordion() {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState<{ [key: number]: number }>({});
  const [cardsPerSlide, setCardsPerSlide] = useState(defaultCardsPerSlide);
  const [bounceDirection, setBounceDirection] = useState<{ [key: number]: 'left' | 'right' | null }>({});

  useEffect(() => {
    const updateCardsPerSlide = () => {
      if (typeof window === "undefined") return;
      const width = window.innerWidth;
      if (width < 768) {
        setCardsPerSlide(1);
      } else if (width < 1024) {
        setCardsPerSlide(2);
      } else if (width < 1440) {
        setCardsPerSlide(3);
      } else {
        setCardsPerSlide(defaultCardsPerSlide);
      }
    };

    updateCardsPerSlide();
    window.addEventListener("resize", updateCardsPerSlide);
    return () => window.removeEventListener("resize", updateCardsPerSlide);
  }, []);

  useEffect(() => {
    setCurrentSlide((prevSlides) => {
      let hasChanges = false;
      const updatedSlides: { [key: number]: number } = { ...prevSlides };

      categories.forEach((category, index) => {
        const maxSlide = Math.max(0, category.projects.length - cardsPerSlide);
        const currentValue = prevSlides[index] ?? 0;
        if (currentValue > maxSlide) {
          updatedSlides[index] = maxSlide;
          hasChanges = true;
        }
      });

      return hasChanges ? updatedSlides : prevSlides;
    });
  }, [cardsPerSlide]);

  const fallbackCardWidth = `calc((100% - ${(Math.max(cardsPerSlide, 1) - 1) * cardGapPx}px) / ${Math.max(cardsPerSlide, 1)})`;

  const toggleCategory = (index: number) => {
    setExpandedCategory((prevExpanded) => (prevExpanded === index ? null : index));
    setCurrentSlide((prevSlides) => {
      const currentValue = prevSlides[index] ?? 0;
      if (currentValue === 0) {
        return prevSlides;
      }
      return {
        ...prevSlides,
        [index]: 0,
      };
    });
  };

  const openProjectModal = (project: PortfolioProject) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const nextSlide = (categoryIndex: number, totalProjects: number) => {
    setCurrentSlide((prevSlides) => {
      const current = prevSlides[categoryIndex] ?? 0;
      const maxSlide = Math.max(0, totalProjects - cardsPerSlide);
      if (current >= maxSlide) {
        // Trigger bounce effect
        setBounceDirection((prev) => ({ ...prev, [categoryIndex]: 'right' }));
        setTimeout(() => setBounceDirection((prev) => ({ ...prev, [categoryIndex]: null })), 300);
        return prevSlides;
      }
      return {
        ...prevSlides,
        [categoryIndex]: current + 1,
      };
    });
  };

  const prevSlide = (categoryIndex: number, totalProjects: number) => {
    setCurrentSlide((prevSlides) => {
      const current = prevSlides[categoryIndex] ?? 0;
      if (current <= 0) {
        // Trigger bounce effect
        setBounceDirection((prev) => ({ ...prev, [categoryIndex]: 'left' }));
        setTimeout(() => setBounceDirection((prev) => ({ ...prev, [categoryIndex]: null })), 300);
        return prevSlides;
      }
      return {
        ...prevSlides,
        [categoryIndex]: current - 1,
      };
    });
  };

  return (
    <section id="portfolio" className="py-24 px-6 md:px-12">
      {/* Header */}
      <div className="mb-16 flex items-baseline justify-end border-b border-white/10 pb-8">
        <h2 className="text-sm tracking-wider text-white/60">
          Selected Work ({totalProjects})
        </h2>
      </div>

      {/* Accordion Categories */}
      <div className="space-y-0">
        {categories.map((category, index) => (
            <div key={category.title} className="border-b border-white/10">
              <button
                onClick={() => toggleCategory(index)}
                className="group w-full py-8 text-left transition-all hover:bg-white/5"
                type="button"
              >
                <div className="flex items-start gap-8 px-6 md:px-12">
                  {/* Plus/Minus Icon */}
                  <div className="flex-shrink-0 pt-2">
                    <div className="relative h-6 w-6">
                      {/* Horizontal line */}
                      <span className="absolute left-1/2 top-1/2 h-[2px] w-6 bg-white transition-transform duration-300"
                            style={{ transform: `translate(-50%, -50%)` }} />
                      {/* Vertical line */}
                      <span className="absolute left-1/2 top-1/2 h-6 w-[2px] bg-white transition-all duration-300"
                            style={{ opacity: expandedCategory === index ? 0 : 1, transform: `translate(-50%, -50%) scaleY(${expandedCategory === index ? 0 : 1})` }} />
                    </div>
                  </div>

                  {/* Category Title */}
                  <div className="flex-1">
                    <h3 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-white">
                      {category.title}
                    </h3>
                    <p className="mt-2 text-sm text-white opacity-40">
                      ({category.count})
                    </p>
                  </div>

                  {/* Preview Images */}
                  {expandedCategory !== index && (
                    <div className="hidden md:flex gap-4 flex-shrink-0">
                      {category.projects.slice(0, 3).map((project, idx) => (
                        <div
                          key={idx}
                          className="relative w-32 aspect-video overflow-hidden rounded-lg bg-white/5"
                        >
                          <ProjectMedia
                            src={project.image}
                            alt={project.title}
                            className="h-full w-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </button>

            {/* Expanded Content - Horizontal Carousel */}
            <div
              className={`overflow-hidden transition-all duration-500 ${
                expandedCategory === index ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="relative px-6 pb-16 md:px-24">
                {/* Navigation Arrows */}
                {expandedCategory === index &&
                  category.projects.length > cardsPerSlide && (
                  <>
                    {/* Left Arrow */}
                    <AnimatePresence>
                      {(currentSlide[index] ?? 0) > 0 && (
                        <motion.button
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            prevSlide(index, category.projects.length);
                          }}
                          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-black/50 backdrop-blur-md border border-white/10 hover:border-white/40 hover:bg-black/70 hover:scale-110 active:scale-95 transition-all rounded-full group/arrow"
                          aria-label="Previous project"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover/arrow:-rotate-12 transition-transform">
                            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </motion.button>
                      )}
                    </AnimatePresence>

                    {/* Right Arrow */}
                    <AnimatePresence>
                      {(currentSlide[index] ?? 0) + cardsPerSlide < category.projects.length && (
                        <motion.button
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.3 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            nextSlide(index, category.projects.length);
                          }}
                          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-black/50 backdrop-blur-md border border-white/10 hover:border-white/40 hover:bg-black/70 hover:scale-110 active:scale-95 transition-all rounded-full group/arrow"
                          aria-label="Next project"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover/arrow:rotate-12 transition-transform">
                            <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </>
                )}

                {/* Carousel Content - Show 4 projects in horizontal scroll */}
                {expandedCategory === index && (
                  <div className="px-12">
                    <motion.div
                      className="flex gap-4 overflow-x-hidden"
                      initial={false}
                      animate={{
                        x: bounceDirection[index] === 'left' ? [-10, 0] : bounceDirection[index] === 'right' ? [10, 0] : 0
                      }}
                      transition={{
                        duration: 0.3,
                        ease: "easeOut"
                      }}
                    >
                      {(() => {
                        const start = currentSlide[index] ?? 0;
                        const projectsToShow = category.projects.slice(
                          start,
                          start + cardsPerSlide
                        );
                        const cardsInView = projectsToShow.length || 1;
                        const cardWidth =
                          cardsInView === cardsPerSlide
                            ? fallbackCardWidth
                            : `calc((100% - ${(cardsInView - 1) * cardGapPx}px) / ${cardsInView})`;

                        return projectsToShow.map((project) => (
                          <div
                            key={project.title}
                            className="group cursor-pointer flex-shrink-0 transition-all duration-300 hover:-translate-y-2 hover:drop-shadow-2xl"
                            style={{ width: cardWidth, minWidth: 0 }}
                            onClick={() => openProjectModal(project)}
                          >
                            <div className="mb-3 aspect-video overflow-hidden rounded-lg bg-white/5 border border-white/10 group-hover:border-white/40 transition-all duration-300">
                              <ProjectMedia
                                src={project.image}
                                alt={project.title}
                                className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                              />
                            </div>
                            <div className="space-y-1 px-1">
                              <p className="text-[10px] uppercase tracking-wider text-white/40">{project.tag}</p>
                              <h4 className="text-sm font-medium text-white leading-tight line-clamp-2">{project.title}</h4>
                            </div>
                          </div>
                        ));
                      })()}
                    </motion.div>
                    {/* Slide Counter */}
                    <div className="text-center mt-6 text-xs text-white/30">
                      Showing {(currentSlide[index] ?? 0) + 1}-
                      {Math.min((currentSlide[index] ?? 0) + cardsPerSlide, category.projects.length)} of {category.projects.length}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
}

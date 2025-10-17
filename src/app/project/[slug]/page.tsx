"use client";

import { useParams, useRouter } from "next/navigation";
import { allProjects } from "@/data/projects";
import type { PortfolioProject } from "@/types/portfolio";
import ProjectMedia from "@/components/project-media";

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const project = allProjects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 border border-white hover:bg-white hover:text-black transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header with Back Button */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-4 md:py-5 flex items-center justify-between backdrop-blur-md bg-black/30 border-b border-white/10">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 hover:opacity-70 transition-opacity"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 16L6 10L12 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Back</span>
        </button>
        <div className="text-sm opacity-60">{project.category}</div>
      </header>

      {/* Hero Image */}
      <section className="pt-20 md:pt-24">
        <div className="aspect-[21/9] bg-neutral-900 overflow-hidden">
          <ProjectMedia
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            autoPlay={true}
          />
        </div>
      </section>

      {/* Project Content */}
      <section className="px-6 md:px-12 py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          {/* Title and Meta */}
          <div className="mb-12">
            <div className="text-xs font-mono mb-4 opacity-60">{project.tag}</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{project.title}</h1>
            {project.technologies && (
              <div className="flex flex-wrap gap-2 mt-6">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="text-xs px-3 py-1.5 border border-white/10 rounded-full opacity-70"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-4">What It Is</h2>
            <p className="text-lg md:text-xl opacity-80 leading-relaxed">
              {project.fullDescription || project.description}
            </p>
          </div>

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Features</h2>
              <div className="space-y-4">
                {project.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 flex-shrink-0" />
                    <p className="text-lg opacity-80">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technical Highlights */}
          {project.technicalHighlights && project.technicalHighlights.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Technical Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {project.technicalHighlights.map((highlight, index) => (
                  <div key={index} className="border-l-2 border-white/20 pl-6">
                    <h3 className="text-xl font-bold mb-3 text-blue-400">{highlight.title}</h3>
                    <p className="opacity-80 leading-relaxed">{highlight.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Features */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.keyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 bg-white/5 p-4 rounded-lg">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                    <p className="opacity-80">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {project.results && project.results.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold mb-6">Results</h2>
              <div className="space-y-4">
                {project.results.map((result, index) => (
                  <div key={index} className="flex items-start gap-3 bg-white/5 p-6 rounded-lg">
                    <div className="text-2xl font-bold text-green-400 flex-shrink-0">✓</div>
                    <p className="text-lg opacity-90">{result}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Back Button */}
          <div className="flex justify-center pt-12 border-t border-white/10">
            <button
              onClick={() => router.push("/")}
              className="px-8 py-4 border border-white hover:bg-white hover:text-black transition-all text-lg"
            >
              ← Back to Projects
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

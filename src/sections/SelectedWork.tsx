import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS, FilterCategory, Project } from '../data/projects';
import { ProjectRow } from '../components/ProjectRow';
import { ClientVisualWorld } from '../components/visuals/ClientVisualWorld';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SelectedWorkProps {
  className?: string;
  showAllInitially?: boolean;
}

/**
 * 13 — SELECTED WORK SECTION
 * Enhanced with GSAP staggered fade-in and upward slide reveal animations
 * for both section headings and project list items.
 */
export const SelectedWork: React.FC<SelectedWorkProps> = ({ className = "" }) => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('ALL');
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isPointerDevice, setIsPointerDevice] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const filterBarRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const contentContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only enable floating preview on non-touch devices
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    setIsPointerDevice(hasFinePointer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPointerDevice) return;
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Layer 4: Multi-plane depth parallax entrance for / SELECTED WORK heading and content container
      // Moves more slowly than the departing foreground typography (lagging by 55px), settling naturally into position
      if (contentContainerRef.current) {
        gsap.fromTo(
          contentContainerRef.current,
          { y: 55, opacity: 0.25 },
          {
            y: 0,
            opacity: 1,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 96%',
              end: 'top 55%',
              scrub: 0.4,
            }
          }
        );
      }

      // 2. Staggered fade-in and upward slide for project list items as user scrolls further
      if (listRef.current) {
        const rows = listRef.current.children;
        gsap.fromTo(
          rows,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [activeFilter]);

  const filterButtons: FilterCategory[] = ['ALL', 'BRANDING', 'DIGITAL', 'MOTION'];

  const filteredProjects = activeFilter === 'ALL'
    ? PROJECTS
    : PROJECTS.filter(p => p.tags.includes(activeFilter));

  return (
    <section 
      ref={sectionRef}
      id="work" 
      className={`relative w-full py-24 sm:py-32 bg-[#03040A] text-[#F2F2ED] border-b border-white/[0.08] ${className}`}
      onMouseMove={handleMouseMove}
    >
      <div ref={contentContainerRef} className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header & Interactive Filter Bar with animation refs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-white/[0.08]">
          <div ref={headingRef}>
            <div className="font-mono text-[11px] text-[#85889A] uppercase tracking-[0.2em] mb-3 flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1018FF]" />
              <span>RELEASE ARCHIVE // 04 RELEASES</span>
            </div>
            <h2 className="font-grotesk text-5xl sm:text-7xl font-bold tracking-[-0.045em] text-[#F2F2ED] uppercase leading-[0.88]">
              SELECTED WORK
            </h2>
          </div>

          {/* Interactive Filter Bar */}
          <div ref={filterBarRef} className="flex flex-wrap items-center gap-2">
            {filterButtons.map((filter) => {
              const isActive = activeFilter === filter;
              const count = filter === 'ALL' 
                ? PROJECTS.length 
                : PROJECTS.filter(p => p.tags.includes(filter)).length;

              return (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`font-mono text-xs tracking-wider uppercase px-3.5 py-2 sm:py-1.5 min-h-[36px] sm:min-h-0 relative transition-all duration-200 border flex items-center gap-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#A8FF00] ${
                    isActive
                      ? 'border-[#A8FF00] bg-[#070A24] text-[#F2F2ED] font-medium shadow-[0_0_15px_rgba(168,255,0,0.15)]'
                      : 'border-white/10 text-[#85889A] hover:text-[#F2F2ED] hover:border-white/25 hover:bg-[#070A24]/40 bg-transparent'
                  }`}
                  aria-pressed={isActive}
                >
                  <span>{filter}</span>
                  <span className={`text-[10px] tabular-nums ${isActive ? 'text-[#A8FF00] font-semibold' : 'text-[#85889A]'}`}>
                    [{count}]
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Catalog List Layout with Stagger Reveal Ref */}
        <div ref={listRef} className="divide-y divide-white/[0.08]">
          {filteredProjects.length === 0 ? (
            <div className="py-20 text-center font-mono text-xs text-[#85889A] uppercase tracking-widest">
              NO RELEASES FOUND IN THIS CATEGORY.
            </div>
          ) : (
            filteredProjects.map((project, index) => (
              <ProjectRow 
                key={project.slug} 
                project={project} 
                index={index}
                onHoverStart={(proj) => setHoveredProject(proj)}
                onHoverEnd={() => setHoveredProject(null)}
                onMouseMove={handleMouseMove}
              />
            ))
          )}
        </div>

        {/* Selected Work Footer Meta */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono text-[#85889A] tracking-wider uppercase gap-4">
          <span>SHOWING {filteredProjects.length} OF {PROJECTS.length} RECENT RELEASES</span>
          <span>ARAXYS ARCHIVE // 2026</span>
        </div>
      </div>

      {/* Floating Project Cursor Preview (Desktop Only) */}
      {isPointerDevice && hoveredProject && (
        <div
          className="fixed pointer-events-none z-30 hidden lg:block -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out"
          style={{
            left: `${cursorPos.x + 80}px`,
            top: `${cursorPos.y}px`,
          }}
        >
          <div className="w-72 h-44 rounded-sm overflow-hidden border border-white/20 shadow-2xl bg-[#070A24] animate-in fade-in zoom-in-95 duration-200">
            <ClientVisualWorld project={hoveredProject} type="hero" />
            <div className="absolute bottom-2 left-2 right-2 bg-black/80 backdrop-blur-sm px-2.5 py-1 text-[10px] font-mono text-white flex justify-between items-center border border-white/10">
              <span className="text-[#A8FF00] font-semibold">{hoveredProject.name}</span>
              <span className="text-[#85889A]">{hoveredProject.year}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SelectedWork;

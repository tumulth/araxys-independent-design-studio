import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ApproachPillar {
  number: string;
  name: string;
  tagline: string;
  description: string;
}

export const APPROACH_PILLARS: ApproachPillar[] = [
  {
    number: '01',
    name: 'THINK',
    tagline: 'Strategic interrogation & structural thesis',
    description: 'We deconstruct brand mechanics down to first principles. Every visual system begins with rigorous inquiry into context, market posture, and technological endurance.'
  },
  {
    number: '02',
    name: 'BUILD',
    tagline: 'Precision architecture & aesthetic execution',
    description: 'We craft comprehensive identity systems, modular typography, and bespoke digital touchpoints engineered to perform with unyielding clarity across modern platforms.'
  },
  {
    number: '03',
    name: 'BREAK',
    tagline: 'Extreme stress-testing & radical iteration',
    description: 'We push every concept beyond comfortable limits. By testing against extreme scaling, hostile contrast environments, and high-velocity motion, weak ideas get eliminated.'
  },
  {
    number: '04',
    name: 'REBUILD',
    tagline: 'Forging permanent, resilient visual languages',
    description: 'We reassemble the refined components into unified, unshakeable visual languages ready for real-world deployment, cultural resonance, and future technological evolution.'
  }
];

export const Approach: React.FC<{ className?: string }> = ({ className = "" }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Heading upward slide and fade-in
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current.children,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          }
        );
      }

      // 2. Staggered fade-in & upward slide for the 4 pillar items
      if (gridRef.current) {
        const cards = gridRef.current.children;
        gsap.fromTo(
          cards,
          { y: 45, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="approach" 
      className={`relative w-full py-24 sm:py-32 bg-[#03040A] text-[#F2F2ED] border-b border-white/[0.08] ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header with Animation Ref */}
        <div ref={headingRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/[0.08]">
          <div>
            <div className="font-mono text-xs text-[#85889A] uppercase tracking-[0.25em] mb-3">
              METHODOLOGY // 03
            </div>
            <h2 className="font-grotesk text-4xl sm:text-6xl font-bold tracking-tight text-[#F2F2ED] uppercase">
              / APPROACH
            </h2>
          </div>
          <p className="font-mono text-xs sm:text-sm text-[#85889A] max-w-md uppercase tracking-wider leading-relaxed">
            A non-linear cycle of inquiry, structural creation, stress-testing, and synthesis.
          </p>
        </div>

        {/* 4 Pillars with Stagger Animation Ref */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-12">
          {APPROACH_PILLARS.map((pillar) => (
            <div 
              key={pillar.name}
              className="group flex flex-col justify-between p-6 sm:p-8 bg-[#070A24]/30 border border-white/[0.06] hover:border-[#A8FF00]/40 transition-colors duration-300 relative overflow-hidden will-change-transform"
            >
              {/* Corner tech accent */}
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#85889A]/40 group-hover:border-[#A8FF00]" />

              <div>
                <div className="font-mono text-xs text-[#85889A] group-hover:text-[#A8FF00] tracking-widest tabular-nums mb-6 transition-colors">
                  PHASE // {pillar.number}
                </div>
                <h3 className="font-grotesk text-3xl sm:text-4xl font-bold tracking-tight text-[#F2F2ED] uppercase mb-3">
                  {pillar.name}
                </h3>
                <div className="font-mono text-[11px] text-[#A8FF00]/90 uppercase tracking-wider mb-4">
                  {pillar.tagline}
                </div>
              </div>

              <p className="text-sm text-[#85889A] leading-relaxed mt-6 border-t border-white/[0.06] pt-4">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Approach;

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface CapabilityArea {
  index: string;
  title: string;
  summary: string;
  deliverables: string[];
}

export const CAPABILITIES_DATA: CapabilityArea[] = [
  {
    index: '01',
    title: 'IDENTITY',
    summary: 'Comprehensive brand identities, typography guidelines, and visual architectures designed to anchor visionary organizations.',
    deliverables: [
      'Brand Identity Systems',
      'Custom Logomarks & Monograms',
      'Art Direction & Style Matrices',
      'Design Guidelines & Brand Manuals',
      'Packaging & Tactile Collateral'
    ]
  },
  {
    index: '02',
    title: 'DIGITAL',
    summary: 'Immersive web experiences, bespoke software interfaces, and high-performance frontend engineering with uncompromising attention to detail.',
    deliverables: [
      'Bespoke Web Platforms',
      'Interactive Design Systems',
      'Creative Frontend Development',
      'E-Commerce & Digital Flagships',
      'UI/UX Architecture & Prototyping'
    ]
  },
  {
    index: '03',
    title: 'SOCIAL',
    summary: 'Social-first visual systems, campaign creative, and short-form content designed to make brands impossible to ignore.',
    deliverables: [
      'Social Media Visual Systems',
      'Instagram Posts & Carousels',
      'Reels & Short-Form Content',
      'Campaign Creatives',
      'Content Templates',
      'Art Direction',
      'Launch & Promotional Campaigns',
      'Social Brand Guidelines'
    ]
  }
];

/**
 * 19 — CAPABILITIES SECTION
 * Editorial typography rows with GSAP staggered fade-in and upward slide reveals.
 */
export const Capabilities: React.FC<{ className?: string }> = ({ className = "" }) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const rowsRef = useRef<HTMLDivElement | null>(null);

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

      // 2. Staggered fade-in & upward slide for capability rows
      if (rowsRef.current) {
        const rows = rowsRef.current.children;
        gsap.fromTo(
          rows,
          { y: 45, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: rowsRef.current,
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
      id="capabilities" 
      className={`relative w-full py-24 sm:py-32 bg-[#03040A] text-[#F2F2ED] border-b border-white/[0.08] ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header with Animation Ref */}
        <div ref={headingRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/[0.08]">
          <div>
            <div className="font-mono text-[11px] text-[#85889A] uppercase tracking-[0.2em] mb-3 flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1018FF]" />
              <span>PRACTICE AREAS // SPECIFICATION</span>
            </div>
            <h2 className="font-grotesk text-5xl sm:text-7xl font-bold tracking-[-0.045em] text-[#F2F2ED] uppercase leading-[0.88]">
              CAPABILITIES
            </h2>
          </div>
          <p className="font-mono text-xs sm:text-sm text-[#85889A] max-w-sm uppercase tracking-wider leading-relaxed md:text-right">
            Specialized visual engineering across brand identity, digital architecture, and creative social systems.
          </p>
        </div>

        {/* Technical Specification Sheet: Monolithic rows with Stagger Animation Ref */}
        <div ref={rowsRef} className="divide-y divide-white/[0.08]">
          {CAPABILITIES_DATA.map((cap) => (
            <div 
              key={cap.title}
              className="py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start group will-change-transform transition-colors duration-200 hover:bg-[#070A24]/20 -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-sm"
            >
              {/* Index & Title */}
              <div className="lg:col-span-5 flex items-baseline gap-6">
                <span className="font-mono text-xs sm:text-sm text-[#85889A] group-hover:text-[#A8FF00] transition-colors tabular-nums">
                  {cap.index}
                </span>
                <h3 className="font-grotesk text-4xl sm:text-6xl font-bold tracking-[-0.04em] leading-[0.9] text-[#F2F2ED] uppercase group-hover:text-white transition-colors">
                  {cap.title}
                </h3>
              </div>

              {/* Description */}
              <div className="lg:col-span-4">
                <p className="text-sm sm:text-[15px] text-[#85889A] leading-[1.68] max-w-[46ch]">
                  {cap.summary}
                </p>
              </div>

              {/* Deliverables Specification Block */}
              <div className="lg:col-span-3">
                <div className="p-4 sm:p-5 bg-[#070A24]/40 border border-white/[0.06] rounded-sm group-hover:border-white/10 transition-colors">
                  <div className="font-mono text-[10px] text-[#85889A] uppercase tracking-widest mb-3 flex items-center justify-between">
                    <span>DELIVERABLE SCOPE</span>
                    <span className="text-[#A8FF00] tabular-nums">[{cap.deliverables.length}]</span>
                  </div>
                  <ul className="flex flex-col gap-2 font-mono text-xs text-[#F2F2ED]/70">
                    {cap.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 hover:text-[#A8FF00] transition-colors">
                        <span className="text-[#1018FF]/80 text-[10px]" aria-hidden="true">/</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Capabilities;

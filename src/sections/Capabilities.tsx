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
    title: 'MOTION',
    summary: 'Cinematic brand films, kinetic typography, 3D broadcast packages, and micro-interactions that infuse visual systems with lifelike energy.',
    deliverables: [
      'Kinetic Brand Identities',
      'Title Sequences & Broadcast Design',
      '3D Motion Environments',
      'Interface Animations & Micro-Interactions',
      'Exhibition & Event Visuals'
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
            <div className="font-mono text-xs text-[#85889A] uppercase tracking-[0.25em] mb-3">
              EXPERTISE // 04
            </div>
            <h2 className="font-grotesk text-4xl sm:text-6xl font-bold tracking-tight text-[#F2F2ED] uppercase">
              / CAPABILITIES
            </h2>
          </div>
          <p className="font-mono text-xs sm:text-sm text-[#85889A] max-w-md uppercase tracking-wider leading-relaxed">
            Specialized visual engineering across brand identity, digital architecture, and kinetic motion.
          </p>
        </div>

        {/* Editorial Layout: Large typography rows with Stagger Animation Ref */}
        <div ref={rowsRef} className="divide-y divide-white/[0.08]">
          {CAPABILITIES_DATA.map((cap) => (
            <div 
              key={cap.title}
              className="py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start group will-change-transform"
            >
              {/* Index & Title */}
              <div className="lg:col-span-5 flex items-baseline gap-6">
                <span className="font-mono text-xs sm:text-sm text-[#85889A] group-hover:text-[#A8FF00] transition-colors tabular-nums">
                  {cap.index}
                </span>
                <h3 className="font-grotesk text-4xl sm:text-6xl font-bold tracking-tight text-[#F2F2ED] uppercase group-hover:text-white transition-colors">
                  {cap.title}
                </h3>
              </div>

              {/* Description */}
              <div className="lg:col-span-4">
                <p className="text-base text-[#85889A] leading-relaxed">
                  {cap.summary}
                </p>
              </div>

              {/* Deliverables List */}
              <div className="lg:col-span-3">
                <div className="font-mono text-[10px] text-[#A8FF00] uppercase tracking-widest mb-3">
                  CORE DELIVERABLES
                </div>
                <ul className="flex flex-col gap-2 font-mono text-xs text-[#F2F2ED]/70">
                  {cap.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 hover:text-[#A8FF00] transition-colors">
                      <span className="text-[#85889A]" aria-hidden="true">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Capabilities;

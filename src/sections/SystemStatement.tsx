import React from 'react';

/**
 * 12 — SYSTEM STATEMENT SECTION
 * Large, centered, editorial statement in the dark visual environment:
 * "WE BUILD VISUAL SYSTEMS."
 */
export const SystemStatement: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <section className={`relative w-full py-28 sm:py-36 bg-[#03040A] text-[#F2F2ED] flex items-center justify-center overflow-hidden border-b border-white/[0.06] ${className}`}>
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-radial from-[#1018FF]/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center relative z-10">
        <div className="font-mono text-xs text-[#A8FF00] tracking-[0.3em] uppercase mb-6">
          DISCIPLINE & PHILOSOPHY
        </div>

        <h2 className="font-grotesk text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight uppercase leading-[0.9] select-none">
          WE BUILD<br />
          <span className="text-[#A8FF00]">VISUAL</span> SYSTEMS.
        </h2>

        <p className="mt-8 text-sm sm:text-base text-[#85889A] max-w-xl mx-auto leading-relaxed">
          Dynamic identities forged for digital velocity, brand endurance, and cinematic scale across physical and computational touchpoints.
        </p>

        <div className="mt-12 flex items-center justify-center gap-6 font-mono text-[10px] text-[#85889A] uppercase tracking-widest">
          <span>01 / IDENTITY</span>
          <span>·</span>
          <span>02 / DIGITAL</span>
          <span>·</span>
          <span>03 / SOCIAL</span>
        </div>
      </div>
    </section>
  );
};

export default SystemStatement;

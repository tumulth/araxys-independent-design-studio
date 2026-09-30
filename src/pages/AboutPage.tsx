import React, { useEffect } from 'react';
import { Approach } from '../sections/Approach';
import { Capabilities } from '../sections/Capabilities';
import { AraxysMark } from '../components/AraxysLogo';

/**
 * 18 — ABOUT PAGE
 * Main statement:
 * ARAXYS
 * WE BUILD VISUAL SYSTEMS.
 * Editorial introduction + THINK / BUILD / BREAK / REBUILD + Capabilities
 */
export const AboutPage: React.FC = () => {
  useEffect(() => {
    document.title = 'ARAXYS — About';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-28 sm:pt-36 bg-[#03040A] text-[#F2F2ED] overflow-x-hidden">
      {/* Editorial Header */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 pb-16 sm:pb-24 border-b border-white/[0.08]">
        <div className="flex items-center gap-3 mb-6">
          <AraxysMark className="w-6 h-6" />
          <span className="font-mono text-xs text-[#85889A] uppercase tracking-[0.25em]">
            ABOUT / INDEPENDENT DESIGN STUDIO · PUNE, INDIA
          </span>
        </div>

        {/* Main Statement */}
        <h1 className="font-grotesk text-5xl sm:text-7xl lg:text-9xl font-bold tracking-tight uppercase leading-[0.88] select-none">
          ARAXYS.<br />
          <span className="text-[#A8FF00]">WE BUILD</span><br />
          VISUAL SYSTEMS.
        </h1>

        {/* Editorial Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 mt-12 sm:mt-16 pt-12 border-t border-white/[0.08]">
          <div className="lg:col-span-5">
            <h2 className="font-grotesk text-2xl sm:text-3xl font-semibold uppercase leading-snug">
              An independent studio dedicated to the architecture of brand presence in a high-speed digital reality.
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-6 text-[#85889A] text-base leading-relaxed">
            <p>
              ARAXYS operates at the convergence of graphic precision, computational engineering, and kinetic motion. We do not produce static brand artifacts meant for passive observation; we engineer dynamic visual systems built to scale, adapt, and lead.
            </p>
            <p>
              By rejecting generic templates, corporate homogenization, and fleeting design gimmicks, we create distinctive identities that hold cultural authority and functional clarity across physical space, product software, and cinematic media.
            </p>
          </div>
        </div>
      </section>

      {/* Methodology Section (THINK, BUILD, BREAK, REBUILD) */}
      <Approach />

      {/* Capabilities Section (IDENTITY, DIGITAL, MOTION) */}
      <Capabilities />

      {/* Studio Ethos & Principles */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-20 sm:py-28 border-b border-white/[0.08]">
        <div className="font-mono text-xs text-[#85889A] uppercase tracking-widest mb-6">
          DISCIPLINE INVARIANTS
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white/[0.02] border border-white/[0.06]">
            <span className="font-mono text-xs text-[#A8FF00] tracking-widest block mb-2">01 / TYPOGRAPHIC RIGOR</span>
            <h3 className="font-grotesk text-xl font-bold uppercase mb-2">Structure Before Styling</h3>
            <p className="text-xs text-[#85889A] leading-relaxed">
              Every system is grounded in calibrated mathematical proportions, disciplined hierarchy, and intentional negative space.
            </p>
          </div>
          <div className="p-6 bg-white/[0.02] border border-white/[0.06]">
            <span className="font-mono text-xs text-[#A8FF00] tracking-widest block mb-2">02 / KINETIC CONTINUITY</span>
            <h3 className="font-grotesk text-xl font-bold uppercase mb-2">Motion As Language</h3>
            <p className="text-xs text-[#85889A] leading-relaxed">
              Motion is not decoration; it is the connective tissue that communicates system physics, hierarchy, and brand temperament.
            </p>
          </div>
          <div className="p-6 bg-white/[0.02] border border-white/[0.06]">
            <span className="font-mono text-xs text-[#A8FF00] tracking-widest block mb-2">03 / RADICAL ENDURANCE</span>
            <h3 className="font-grotesk text-xl font-bold uppercase mb-2">Engineered For Decades</h3>
            <p className="text-xs text-[#85889A] leading-relaxed">
              We design against algorithmic trend churn, building visual foundations resilient enough to withstand shifting market cycles.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

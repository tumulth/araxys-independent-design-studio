import React, { useState } from 'react';
import { Project } from '../../data/projects';

interface ClientVisualProps {
  project: Project;
  type?: 'hero' | 'gallery' | 'thumbnail';
  index?: number;
  className?: string;
  imageSrc?: string;
  caption?: string;
}

/**
 * Renders art-directed client visual representations.
 * Crucially implements Section 17:
 * - Does NOT force Araxys blue/lime onto client case studies.
 * - Adheres strictly to each client's distinct visual identity:
 *   1. BIMACME: Industrial / Architectural / Technical (Steel, blueprint grids, precision lines)
 *   2. BUTTA BURGER: Food / Bold / Warm / Energetic (Amber gold, toasted kraft, savory graphic stamps)
 *   3. NIKHIL KAPAHI: Editorial / Refined / Personal / Minimal (Muted stone, architectural stillness, linen texture)
 *   4. BURGYARD: Red / Black / White / Street / Character-driven (Reckless vermillion, urban wheatpaste)
 * - Implements Zero-Broken-Image fallback with graceful degradation.
 */
export const ClientVisualWorld: React.FC<ClientVisualProps> = ({
  project,
  type = 'hero',
  index = 0,
  className = "",
  imageSrc,
  caption
}) => {
  const [imageError, setImageError] = useState(false);
  const { visualWorld, name, category, year } = project;

  // Render client-specific graphics if imageSrc is missing or failed to load
  const renderClientSpecificGraphic = () => {
    switch (visualWorld.theme) {
      case 'industrial':
        // BIMACME: Steel tones, engineering drafting grid, precision crosshairs, CAD elevations
        return (
          <div className="relative w-full h-full bg-[#080C14] flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden border border-slate-800/80">
            {/* Drafting blueprint grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:32px_32px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(100,116,139,0.15),transparent_60%)]" />

            {/* Technical top rail */}
            <div className="relative z-10 flex justify-between items-start font-mono text-[10px] text-slate-400 tracking-wider">
              <span className="uppercase">SYS.REF // 104-BIM</span>
              <span className="tabular-nums">SCALE 1:250 // AXIAL</span>
            </div>

            {/* Central Isometric Architectural Construction */}
            <div className="relative z-10 my-auto flex flex-col items-center justify-center">
              <svg viewBox="0 0 240 160" className="w-56 sm:w-72 h-auto stroke-slate-300 fill-none" strokeWidth="1.2">
                {/* Structural 3D Wireframe Monolith */}
                <polygon points="120,20 200,60 120,100 40,60" className="stroke-slate-400 fill-slate-900/60" />
                <polygon points="40,60 120,100 120,150 40,110" className="stroke-slate-500 fill-slate-950/80" />
                <polygon points="200,60 120,100 120,150 200,110" className="stroke-slate-400 fill-slate-900/40" />
                {/* Precision dimension lines */}
                <line x1="40" y1="120" x2="120" y2="160" stroke="#94A3B8" strokeDasharray="3 3" strokeWidth="0.8" />
                <circle cx="120" cy="20" r="3" fill="#94A3B8" />
                <circle cx="200" cy="60" r="3" fill="#94A3B8" />
                <circle cx="40" cy="60" r="3" fill="#94A3B8" />
              </svg>
              <div className="font-grotesk text-2xl sm:text-4xl font-bold tracking-tight text-white uppercase mt-4">
                {name}
              </div>
              <span className="font-mono text-xs text-slate-400 uppercase tracking-widest mt-1">
                ENGINEERED STRUCTURAL SYSTEM
              </span>
            </div>

            {/* Technical bottom rail */}
            <div className="relative z-10 flex justify-between items-end border-t border-slate-800/80 pt-4 font-mono text-[10px] text-slate-500 uppercase">
              <span>{category}</span>
              <span>{year} // B2B ARCHITECTURE</span>
            </div>
          </div>
        );

      case 'food':
        // BUTTA BURGER: Warm amber, toasted gold, appetizing kraft print, bold circular stamps
        return (
          <div className="relative w-full h-full bg-[#140D08] flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden border border-amber-950/60">
            {/* Warm amber radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(245,158,11,0.22),transparent_70%)]" />
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:20px_20px]" />

            {/* Top packaging banner */}
            <div className="relative z-10 flex justify-between items-center font-grotesk text-xs text-[#F59E0B] font-bold tracking-widest uppercase">
              <span>SMASH & MELT</span>
              <span>EST. 2026 // PACKAGING SPEC</span>
            </div>

            {/* Central Savory Stamp & Monogram */}
            <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-dashed border-[#F59E0B] p-2 flex items-center justify-center animate-spin-slow">
                <div className="w-full h-full rounded-full bg-[#F59E0B] flex items-center justify-center shadow-lg">
                  <span className="font-grotesk font-black text-2xl sm:text-3xl text-[#140D08] tracking-tighter">
                    BUTTA
                  </span>
                </div>
              </div>
              <div className="font-grotesk text-3xl sm:text-5xl font-black tracking-tight text-[#FFFBEB] uppercase mt-6">
                {name}
              </div>
              <p className="font-mono text-xs sm:text-sm text-[#FCD34D] tracking-widest mt-2 uppercase">
                TASTE-FIRST IDENTITY & PACKAGING
              </p>
            </div>

            {/* Bottom packaging label */}
            <div className="relative z-10 flex justify-between items-end border-t border-amber-900/40 pt-4 font-mono text-[10px] text-amber-500/80 uppercase">
              <span>GREASEPROOF KRAFT WRAP</span>
              <span>100% ORGANIC INGREDIENTS</span>
            </div>
          </div>
        );

      case 'editorial':
        // NIKHIL KAPAHI: Minimal stone, architectural silence, delicate serif/sans pairing, linen paper
        return (
          <div className="relative w-full h-full bg-[#0E0C0B] flex flex-col justify-between p-8 sm:p-14 select-none overflow-hidden border border-stone-800">
            {/* Subtle linen paper texture & soft diffused lighting */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(231,229,228,0.06),transparent_60%)]" />
            
            {/* Top minimalist header */}
            <div className="relative z-10 flex justify-between items-start font-mono text-[10px] text-stone-500 tracking-[0.25em] uppercase">
              <span>ARCHIVE / MONOGRAPH</span>
              <span>NO. 03</span>
            </div>

            {/* Quiet, refined central typography */}
            <div className="relative z-10 my-auto max-w-lg">
              <span className="font-mono text-xs text-stone-400 tracking-[0.3em] uppercase block mb-3">
                ARCHITECTURAL PRACTICE
              </span>
              <h3 className="font-grotesk text-3xl sm:text-6xl font-light tracking-tight text-[#FAFAF9] uppercase leading-[0.95]">
                {name}
              </h3>
              <div className="w-12 h-[1px] bg-stone-500 my-6" />
              <p className="font-mono text-xs text-stone-400 leading-relaxed max-w-sm">
                Materiality, void, and monolithic restraint. Visual identity designed for permanence.
              </p>
            </div>

            {/* Bottom specs */}
            <div className="relative z-10 flex justify-between items-end border-t border-stone-800 pt-4 font-mono text-[10px] text-stone-500 uppercase tracking-widest">
              <span>EDITION 2026</span>
              <span>PRINTED ON 350GSM COTTON</span>
            </div>
          </div>
        );

      case 'street':
        // BURGYARD: Signal Vermillion, asphalt black, stencil white, hazard diagonal stripes, wheatpaste
        return (
          <div className="relative w-full h-full bg-[#0C0606] flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden border border-red-950/70">
            {/* Red hazard diagonal stripe bar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-[repeating-linear-gradient(45deg,#EF4444,#EF4444_12px,#0C0606_12px,#0C0606_24px)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(239,68,68,0.22),transparent_60%)]" />

            {/* Top street badge */}
            <div className="relative z-10 flex justify-between items-center font-mono text-[10px] font-bold text-red-500 tracking-widest uppercase pt-2">
              <span className="bg-red-600 text-white px-2 py-0.5 font-bold">BURGYARD DROP // 04</span>
              <span className="text-white">UNDERGROUND EDITION</span>
            </div>

            {/* Reckless Central Graffiti Stencil Lockup */}
            <div className="relative z-10 my-auto flex flex-col items-start justify-center">
              <div className="font-mono text-xs text-red-500 uppercase tracking-[0.3em] font-bold mb-1">
                LATE NIGHT CULTURE
              </div>
              <h3 className="font-grotesk text-4xl sm:text-7xl font-black tracking-tighter text-white uppercase leading-[0.88] drop-shadow-[4px_4px_0_#EF4444]">
                BURGYARD
              </h3>
              <p className="mt-4 font-mono text-xs text-red-300 max-w-sm tracking-wide uppercase">
                STREET FOOD MEETS SKATE CULTURE. REBEL PACKAGING SYSTEM.
              </p>
            </div>

            {/* Bottom street tape */}
            <div className="relative z-10 flex justify-between items-end border-t border-red-900/50 pt-4 font-mono text-[10px] text-red-400 uppercase tracking-widest">
              <span>ALL WEATHER PACKAGING</span>
              <span>SIGNAL VERMILLION 04</span>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full h-full bg-[#070A24] flex items-center justify-center p-8 text-center border border-[#1018FF]/20">
            <span className="font-grotesk text-2xl font-bold uppercase">{name}</span>
          </div>
        );
    }
  };

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* If an image path is provided and loaded successfully, display it */}
      {imageSrc && !imageError ? (
        <img
          src={imageSrc}
          alt={caption || `${project.name} showcase visual`}
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
      ) : (
        renderClientSpecificGraphic()
      )}
      
      {/* Optional caption bar */}
      {caption && (
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-xs font-mono text-[#F2F2ED]/90">
          {caption}
        </div>
      )}
    </div>
  );
};

export default ClientVisualWorld;

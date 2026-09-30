import React from 'react';

interface GridOverlayProps {
  active: boolean;
}

/**
 * Visual Systems Architectural 12-Column Grid Inspector
 * Allows clients & designers to inspect the structural grid math of ARAXYS.
 */
export const GridOverlay: React.FC<GridOverlayProps> = ({ active }) => {
  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 select-none overflow-hidden">
      {/* 12-Column Overlay */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-full">
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-4 sm:gap-6 h-full border-x border-[#A8FF00]/25">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className={`h-full border-r border-[#A8FF00]/15 bg-[#A8FF00]/[0.015] flex flex-col justify-between py-2 text-[9px] font-mono text-[#A8FF00]/50 ${
                i >= 4 ? 'hidden sm:flex' : 'flex'
              } ${i >= 8 ? 'hidden lg:flex' : ''}`}
            >
              <span>COL_{String(i + 1).padStart(2, '0')}</span>
              <span className="self-end">8PT</span>
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal Baseline Guides */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(168,255,0,0.06)_1px,transparent_1px)] bg-[size:100%_24px] pointer-events-none opacity-40" />

      {/* Grid active telemetry indicator in corner */}
      <div className="fixed bottom-4 right-4 bg-[#03040A]/90 border border-[#A8FF00] px-3 py-1 font-mono text-[9px] text-[#A8FF00] tracking-widest uppercase flex items-center gap-2 shadow-[0_0_15px_rgba(168,255,0,0.3)]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#A8FF00] animate-ping" />
        <span>SYSTEM GRID ACTIVE // 12-COL 8PT BASELINE</span>
      </div>
    </div>
  );
};

export default GridOverlay;

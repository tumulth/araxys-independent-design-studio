import React from 'react';

interface MarqueeStripProps {
  className?: string;
}

export const MarqueeStrip: React.FC<MarqueeStripProps> = ({ className = "" }) => {
  const items = [
    'BRAND ARCHITECTURE',
    'KINETIC MOTION',
    'DIGITAL SYSTEMS',
    'COMPUTATIONAL DESIGN',
    'EDITORIAL TYPOGRAPHY',
    'ARAXYS MMXXVI',
    'INDEPENDENT STUDIO',
    'PHYSICAL & DIGITAL'
  ];

  return (
    <div className={`relative w-full overflow-hidden border-y border-white/[0.08] bg-[#070A24]/40 py-3.5 select-none ${className}`}>
      <div className="animate-marquee flex items-center gap-12 font-mono text-xs tracking-[0.25em] text-[#85889A] uppercase whitespace-nowrap">
        {/* Double array to create seamless loop */}
        {[...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center gap-12">
            <span className="hover:text-[#A8FF00] transition-colors">{text}</span>
            <span className="text-[#A8FF00]" aria-hidden="true">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarqueeStrip;

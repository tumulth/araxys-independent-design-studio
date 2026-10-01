import React, { useEffect } from 'react';
import { Hero } from '../sections/Hero';
import { SelectedWork } from '../sections/SelectedWork';
import { MarqueeStrip } from '../components/MarqueeStrip';
import { Approach } from '../sections/Approach';
import { Capabilities } from '../sections/Capabilities';
import { ContactSection } from '../sections/ContactSection';

/**
 * 30 — HOMEPAGE ORCHESTRATION
 * Sequence:
 * 1. INTRO VIDEO (vintage CRT pyramid activation) -> seamlessly match-cuts into:
 * 2. HERO / HOMEPAGE LOOP ("WE MAKE BRANDS IMPOSSIBLE TO IGNORE.")
 * 3. CINEMATIC SCROLL TRANSITION (CRT -> ARAXYS logo -> geometric fragments outward)
 * 4. WE BUILD VISUAL SYSTEMS.
 * 5. FADE TO BLACK
 * 6. SELECTED WORK
 * 7. MARQUEE STRIP
 * 8. APPROACH (THINK, BUILD, BREAK, REBUILD)
 * 9. CAPABILITIES (IDENTITY, DIGITAL, SOCIAL)
 * 10. CONTACT (LET'S BUILD SOMETHING.)
 */
export const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = 'ARAXYS — Design Studio';
  }, []);

  return (
    <div className="relative w-full bg-[#03040A] text-[#F2F2ED] overflow-x-clip">
      {/* 09 — Unified Cinematic Hero Stage (Video -> Image Sequence -> System Statement) */}
      <Hero />

      {/* 13 — Selected Work */}
      <SelectedWork />

      {/* Kinetic Marquee Ribbon */}
      <MarqueeStrip />

      {/* 18 — Approach (THINK, BUILD, BREAK, REBUILD) */}
      <Approach />

      {/* 19 — Capabilities (IDENTITY, DIGITAL, SOCIAL) */}
      <Capabilities />

      {/* 20 — Contact (LET'S BUILD SOMETHING.) */}
      <ContactSection />
    </div>
  );
};

export default HomePage;

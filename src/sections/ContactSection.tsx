import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Copy, Check } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const ContactSection: React.FC<{ isStandalonePage?: boolean }> = ({ 
  isStandalonePage = false 
}) => {
  const [copied, setCopied] = useState(false);
  const studioEmail = "hello@araxys.design";
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(studioEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socials = [
    { name: 'INSTAGRAM', placeholder: '[INSTAGRAM HANDLE]', href: '#' },
    { name: 'LINKEDIN', placeholder: '[LINKEDIN PROFILE]', href: '#' },
    { name: 'TWITTER / X', placeholder: '[TWITTER/X HANDLE]', href: '#' },
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Heading upward slide and fade-in
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
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

      // 2. Contact grid items upward slide and fade-in
      if (gridRef.current) {
        const columns = gridRef.current.children;
        gsap.fromTo(
          columns,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
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
      id="contact"
      className={`relative w-full bg-[#03040A] text-[#F2F2ED] ${
        isStandalonePage ? 'pt-32 pb-24 sm:pt-40 sm:pb-32' : 'py-24 sm:py-36'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Heading with GSAP animation ref */}
        <div ref={headingRef} className="border-b border-white/[0.08] pb-14 sm:pb-20">
          <div className="font-mono text-xs text-[#85889A] uppercase tracking-[0.25em] mb-4">
            CONTACT // 05
          </div>
          <h2 className="font-grotesk text-6xl sm:text-8xl md:text-9xl font-bold tracking-tight uppercase leading-[0.88] select-none">
            LET'S BUILD<br />
            <span className="text-[#A8FF00]">SOMETHING.</span>
          </h2>
        </div>

        {/* Contact Grid: Direct Communication & Channels with GSAP animation ref */}
        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-14 sm:pt-16">
          {/* Left: Email Inquiries */}
          <div className="lg:col-span-7 flex flex-col justify-between will-change-transform">
            <div>
              <span className="font-mono text-xs text-[#85889A] uppercase tracking-widest block mb-4">
                COMMISSION INQUIRIES & NEW PROJECTS
              </span>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <a
                  href={`mailto:${studioEmail}`}
                  className="font-grotesk text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#F2F2ED] hover:text-[#A8FF00] transition-colors"
                >
                  {studioEmail}
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 self-start sm:self-auto px-3 py-1.5 border border-white/10 hover:border-[#A8FF00] text-xs font-mono text-[#85889A] hover:text-[#A8FF00] transition-colors uppercase tracking-wider"
                  aria-label="Copy studio email address"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#A8FF00]" />
                      <span className="text-[#A8FF00]">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>COPY</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="mt-12 sm:mt-16 font-mono text-xs text-[#85889A] space-y-1">
              <p>LOCATION: PUNE / INDIA</p>
              <p>RESPONSE TIME: UNDER 24 HOURS ON BUSINESS DAYS.</p>
            </div>
          </div>

          {/* Right: Social Channels & Location */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8 border-t lg:border-t-0 lg:border-l border-white/[0.08] lg:pl-12 pt-8 lg:pt-0 will-change-transform">
            <div>
              <span className="font-mono text-xs text-[#85889A] uppercase tracking-widest block mb-6">
                CHANNELS & NETWORK
              </span>
              <div className="divide-y divide-white/[0.08]">
                {socials.map((social) => (
                  <div
                    key={social.name}
                    className="py-4 flex items-center justify-between text-sm font-mono text-[#F2F2ED]"
                  >
                    <span>{social.name}</span>
                    <div className="flex items-center gap-2 text-[#85889A]">
                      <span className="text-xs">{social.placeholder}</span>
                      <ArrowUpRight className="w-4 h-4 text-[#85889A]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Studio Location */}
            <div className="border-t border-white/[0.08] pt-6 flex flex-col gap-1 font-mono text-[11px] text-[#85889A] uppercase tracking-wider">
              <span className="text-[#F2F2ED]/90 font-medium">ARAXYS STUDIO</span>
              <span className="text-[#A8FF00]">BASED IN PUNE, INDIA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AraxysLogo } from './AraxysLogo';
import { useIntro } from '../context/IntroContext';

interface NavbarProps {
  hiddenInitially?: boolean;
}

/**
 * 06 — MINIMAL NAVIGATION
 * Desktop: ARAXYS | WORK · ABOUT · CONTACT | START PROJECT →
 * Location metadata: PUNE / INDIA
 * Removed all invented clocks and fake international offices.
 */
export const Navbar: React.FC<NavbarProps> = ({ 
  hiddenInitially = false
}) => {
  const { presentationState } = useIntro();
  const isNavbarHidden = presentationState !== 'HERO_REVEAL' && presentationState !== 'SCROLL_UNLOCKED';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle mobile menu body scroll lock and Escape key listener
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileMenuOpen]);

  if (hiddenInitially) {
    return null;
  }

  const navLinks = [
    { label: 'WORK', href: '/work' },
    { label: 'ABOUT', href: '/about' },
    { label: 'CONTACT', href: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-700 ${
          isNavbarHidden ? 'opacity-0 pointer-events-none -translate-y-2' : 'opacity-100 pointer-events-auto translate-y-0'
        } ${
          isScrolled 
            ? 'bg-[#03040A]/90 backdrop-blur-md border-b border-white/[0.06] py-3.5' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Zone 1: Single Brand element */}
          <Link 
            to="/" 
            className="group flex items-center focus:outline-none focus-visible:ring-1 focus-visible:ring-[#A8FF00]"
            aria-label="ARAXYS Homepage"
          >
            <img 
              src="/assets/araxys-logo.png" 
              alt="ARAXYS" 
              className="h-7 sm:h-8 w-auto object-contain block" 
            />
          </Link>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-[0.2em]">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href || 
                (link.href === '/work' && location.pathname.startsWith('/work'));
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`uppercase transition-colors duration-200 py-1 relative ${
                    isActive 
                      ? 'text-[#A8FF00]' 
                      : 'text-[#F2F2ED]/70 hover:text-[#A8FF00]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#A8FF00]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Zone 3: Studio Location & Primary Action */}
          <div className="flex items-center gap-4">
            <span className="hidden lg:inline-block font-mono text-[10px] text-[#85889A] tracking-widest uppercase">
              PUNE / INDIA
            </span>

            <Link
              to="/contact"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider text-[#03040A] bg-[#A8FF00] hover:bg-[#F2F2ED] transition-colors font-medium"
            >
              <span>START PROJECT</span>
              <span aria-hidden="true">→</span>
            </Link>

            {/* Mobile Menu Trigger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#F2F2ED] hover:text-[#A8FF00] p-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#A8FF00]"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              <span>{mobileMenuOpen ? 'CLOSE' : 'MENU'}</span>
              <span className="w-2 h-2 rounded-full bg-[#A8FF00] animate-pulse" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-50 bg-[#03040A] flex flex-col justify-between p-8 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          {/* Mobile Header */}
          <div className="flex items-center justify-between">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} aria-label="ARAXYS Home">
              <img 
                src="/assets/araxys-logo.png" 
                alt="ARAXYS" 
                className="h-7 w-auto object-contain block" 
              />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-mono tracking-widest uppercase text-[#F2F2ED] hover:text-[#A8FF00] py-2 px-3 border border-white/10"
              aria-label="Close mobile navigation menu"
            >
              CLOSE [✕]
            </button>
          </div>

          {/* Mobile Links */}
          <nav className="flex flex-col gap-6 my-auto">
            {navLinks.map((link, idx) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-grotesk text-4xl sm:text-5xl font-bold tracking-tight text-[#F2F2ED] hover:text-[#A8FF00] uppercase transition-colors flex items-center justify-between border-b border-white/[0.08] pb-4"
              >
                <span>{link.label}</span>
                <span className="font-mono text-xs text-[#85889A]">0{idx + 1}</span>
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 inline-flex items-center justify-center py-3 bg-[#A8FF00] text-[#03040A] font-mono text-xs uppercase tracking-widest font-semibold"
            >
              START PROJECT →
            </Link>
          </nav>

          {/* Mobile Footer Info */}
          <div className="flex flex-col gap-1 font-mono text-[10px] text-[#85889A] uppercase tracking-widest border-t border-white/[0.08] pt-4">
            <span className="text-[#F2F2ED]/90">ARAXYS / INDEPENDENT DESIGN STUDIO</span>
            <span>BASED IN PUNE, INDIA</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';
import { AraxysLogo } from './AraxysLogo';

/**
 * 16 — MINIMAL EDITORIAL FOOTER
 * ARAXYS
 * INDEPENDENT DESIGN STUDIO
 * PUNE / INDIA
 * WORK · ABOUT · CONTACT
 * © 2026 ARAXYS
 */
export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#03040A] border-t border-white/[0.08] text-[#F2F2ED] py-14 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Brand & Studio Note */}
        <div className="flex flex-col gap-1.5">
          <Link to="/" className="inline-block">
            <AraxysLogo />
          </Link>
          <span className="font-mono text-[11px] text-[#85889A] tracking-wider uppercase">
            INDEPENDENT DESIGN STUDIO
          </span>
          <span className="font-mono text-[11px] text-[#A8FF00] tracking-wider uppercase">
            PUNE / INDIA
          </span>
        </div>

        {/* Footer Nav Links */}
        <nav className="flex items-center gap-8 font-mono text-xs tracking-[0.2em] uppercase">
          <Link to="/work" className="text-[#85889A] hover:text-[#A8FF00] transition-colors">
            WORK
          </Link>
          <Link to="/about" className="text-[#85889A] hover:text-[#A8FF00] transition-colors">
            ABOUT
          </Link>
          <Link to="/contact" className="text-[#85889A] hover:text-[#A8FF00] transition-colors">
            CONTACT
          </Link>
        </nav>

        {/* Copyright */}
        <div className="flex flex-col md:items-end gap-1 font-mono text-[11px] text-[#85889A] tracking-wider">
          <span className="text-[#F2F2ED]/90 uppercase">© 2026 ARAXYS</span>
          <span className="text-[#85889A]/80">ALL RIGHTS RESERVED</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

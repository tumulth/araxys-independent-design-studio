import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { IntroProvider } from './context/IntroContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { WorkPage } from './pages/WorkPage';
import { CaseStudyPage } from './pages/CaseStudyPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  return (
    <BrowserRouter>
      <IntroProvider>
        <div className="min-h-screen bg-[#03040A] text-[#F2F2ED] flex flex-col justify-between selection:bg-[#A8FF00] selection:text-[#03040A] relative">
          {/* Accessible skip link for keyboard navigation */}
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#A8FF00] focus:text-[#03040A] focus:font-mono focus:text-xs focus:font-bold focus:uppercase focus:ring-2 focus:ring-white"
          >
            Skip to main content
          </a>

          {/* Subtle analog film grain texture across dark canvas */}
          <div className="film-grain" />

          {/* Minimal Navigation Top Bar */}
          <Navbar />

        {/* Main Application Routes */}
        <main id="main-content" className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/work/:slug" element={<CaseStudyPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Fallback redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Clean Editorial Footer */}
        <Footer />
      </div>
    </IntroProvider>
  </BrowserRouter>
  );
}

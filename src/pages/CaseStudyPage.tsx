import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Maximize2 } from 'lucide-react';
import { PROJECT_LOOKUP } from '../data/projects';
import { ClientVisualWorld } from '../components/visuals/ClientVisualWorld';
import { ProjectVideo } from '../components/media/ProjectVideo';
import { Lightbox } from '../components/Lightbox';

export const CaseStudyPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeArtifactIndex, setActiveArtifactIndex] = useState(0);

  // Scroll to top upon navigation to another project
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!slug || !PROJECT_LOOKUP[slug]) {
    return <Navigate to="/work" replace />;
  }

  const project = PROJECT_LOOKUP[slug];
  const nextProject = PROJECT_LOOKUP[project.nextProject];
  const prevProject = PROJECT_LOOKUP[project.prevProject];

  // Set document title according to SEO guidelines
  useEffect(() => {
    document.title = `ARAXYS — ${project.name}`;
  }, [project.name]);

  const { visualWorld, content } = project;

  return (
    <article 
      className="min-h-screen pt-24 pb-20 text-[#F2F2ED] transition-colors duration-500"
      style={{ backgroundColor: visualWorld.surfaceBg }}
    >
      {/* 1. Back to Selected Work Navigation */}
      <nav className="max-w-7xl mx-auto px-6 sm:px-8 mb-8 flex items-center justify-between" aria-label="Breadcrumb">
        <Link
          to="/work"
          className="inline-flex items-center gap-2 font-mono text-xs text-[#85889A] hover:text-[#A8FF00] uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO SELECTED WORK</span>
        </Link>

        <div className="font-mono text-xs text-[#85889A] uppercase tracking-widest hidden sm:block">
          CASE STUDY // {project.number} OF 04
        </div>
      </nav>

      {/* 2 - 5: Project Header Meta (Number, Name, Category, Year) */}
      <header className="max-w-7xl mx-auto px-6 sm:px-8 pb-12 sm:pb-16 border-b border-white/[0.08]">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="font-mono text-xs sm:text-sm text-[#A8FF00] tracking-widest tabular-nums font-semibold">
                NO. {project.number}
              </span>
              <span className="text-[#85889A]" aria-hidden="true">·</span>
              <span className="font-mono text-xs text-[#85889A] uppercase tracking-widest">
                {project.category}
              </span>
            </div>

            <h1 className="font-grotesk text-5xl sm:text-7xl lg:text-9xl font-bold tracking-tight uppercase leading-[0.88]">
              {project.name}
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-12 font-mono text-xs text-[#85889A] uppercase tracking-wider">
            <div>
              <span className="block text-[10px] text-[#85889A]/60">CLIENT</span>
              <span className="text-[#F2F2ED]">{project.client}</span>
            </div>
            <div>
              <span className="block text-[10px] text-[#85889A]/60">YEAR</span>
              <span className="text-[#F2F2ED] tabular-nums">{project.year}</span>
            </div>
            <div>
              <span className="block text-[10px] text-[#85889A]/60">TAGS</span>
              <span className="text-[#F2F2ED]">{project.tags.join(' · ')}</span>
            </div>
          </div>
        </div>
      </header>

      {/* 6. Hero Visual */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-10 sm:py-16">
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-sm overflow-hidden border border-white/10 shadow-2xl">
          <ClientVisualWorld project={project} type="hero" />
        </div>
      </section>

      {/* 7. Project Statement (Editorial, Large) */}
      <section className="max-w-5xl mx-auto px-6 sm:px-8 py-12 sm:py-20 text-center">
        <div className="font-mono text-xs text-[#85889A] uppercase tracking-[0.25em] mb-4">
          PROJECT STATEMENT
        </div>
        <blockquote className="font-grotesk text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#F2F2ED] leading-snug">
          "{content.statement}"
        </blockquote>
      </section>

      {/* 8 - 10: Overview, Challenge, Approach */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-14 sm:py-20 border-t border-b border-white/[0.08]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16">
          {/* 8. Overview */}
          <div>
            <div className="font-mono text-xs text-[#85889A] uppercase tracking-widest mb-3">
              01 // OVERVIEW
            </div>
            <h3 className="font-grotesk text-xl font-bold uppercase text-[#F2F2ED] mb-3">
              Strategic Context
            </h3>
            <p className="text-sm sm:text-base text-[#85889A] leading-relaxed">
              {content.overview}
            </p>
          </div>

          {/* 9. Challenge */}
          <div>
            <div className="font-mono text-xs text-[#85889A] uppercase tracking-widest mb-3">
              02 // CHALLENGE
            </div>
            <h3 className="font-grotesk text-xl font-bold uppercase text-[#F2F2ED] mb-3">
              The Friction
            </h3>
            <p className="text-sm sm:text-base text-[#85889A] leading-relaxed">
              {content.challenge}
            </p>
          </div>

          {/* 10. Approach */}
          <div>
            <div className="font-mono text-xs text-[#85889A] uppercase tracking-widest mb-3">
              03 // APPROACH
            </div>
            <h3 className="font-grotesk text-xl font-bold uppercase text-[#F2F2ED] mb-3">
              System Solution
            </h3>
            <p className="text-sm sm:text-base text-[#85889A] leading-relaxed">
              {content.approach}
            </p>
          </div>
        </div>
      </section>

      {/* 11. Identity / Design System Specifications */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <div className="font-mono text-xs text-[#A8FF00] uppercase tracking-widest mb-3">
              SYSTEM ARCHITECTURE
            </div>
            <h2 className="font-grotesk text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#F2F2ED] mb-6">
              {content.identitySystem.title}
            </h2>
            <p className="text-sm sm:text-base text-[#85889A] leading-relaxed">
              {content.identitySystem.description}
            </p>
          </div>

          <div className="lg:col-span-7 bg-white/[0.02] border border-white/[0.08] p-6 sm:p-8">
            <span className="font-mono text-xs text-[#85889A] uppercase tracking-widest block mb-4">
              TECHNICAL SPECIFICATIONS MATRIX
            </span>
            <div className="divide-y divide-white/[0.06]">
              {content.identitySystem.specs.map((spec, i) => (
                <div key={i} className="py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs">
                  <span className="text-[#85889A] uppercase tracking-wider">{spec.label}</span>
                  <span className="text-[#F2F2ED] font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 12. Applications */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-12 border-t border-white/[0.08]">
        <div className="max-w-3xl">
          <div className="font-mono text-xs text-[#85889A] uppercase tracking-widest mb-3">
            DEPLOYMENT
          </div>
          <h2 className="font-grotesk text-3xl sm:text-4xl font-bold uppercase text-[#F2F2ED] mb-4">
            {content.applications.title}
          </h2>
          <p className="text-sm sm:text-base text-[#85889A] leading-relaxed">
            {content.applications.description}
          </p>
        </div>
      </section>

      {/* 13. Large Visual Gallery */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
        <div className="flex items-center justify-between mb-6">
          <div className="font-mono text-xs text-[#85889A] uppercase tracking-widest">
            VISUAL ARTIFACTS GALLERY
          </div>
          <span className="font-mono text-[10px] text-[#A8FF00] tracking-widest uppercase">
            CLICK ARTIFACT TO EXPAND [FULLSCREEN]
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {project.media.gallery.map((item, idx) => (
            <div 
              key={idx}
              onClick={() => {
                setActiveArtifactIndex(idx);
                setLightboxOpen(true);
              }}
              className={`rounded-sm overflow-hidden border border-white/10 relative group cursor-pointer ${
                item.aspect === '16:9' ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'
              }`}
            >
              <ClientVisualWorld 
                project={project} 
                type="gallery" 
                index={idx}
                imageSrc={item.src}
                caption={item.caption}
              />
              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/80 border border-white/20 text-xs font-mono text-white tracking-widest uppercase">
                  <Maximize2 className="w-3.5 h-3.5 text-[#A8FF00]" />
                  <span>EXPAND ARTIFACT</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cinematic Lightbox Modal */}
      <Lightbox
        project={project}
        activeIndex={activeArtifactIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNext={() => setActiveArtifactIndex((prev) => (prev + 1) % project.media.gallery.length)}
        onPrev={() => setActiveArtifactIndex((prev) => (prev - 1 + project.media.gallery.length) % project.media.gallery.length)}
      />

      {/* 14. Project Video Showcase */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-12 sm:py-16 border-t border-white/[0.08]">
        <div className="mb-6 flex items-center justify-between">
          <div className="font-mono text-xs text-[#85889A] uppercase tracking-widest">
            14 // KINETIC SYSTEM REEL
          </div>
          <span className="font-mono text-[10px] text-[#A8FF00] tracking-widest uppercase">
            60FPS COMPOSITING
          </span>
        </div>
        <ProjectVideo 
          project={project} 
          src={project.media.projectVideo} 
        />
      </section>

      {/* 15. Final Applications & Summary */}
      <section className="max-w-5xl mx-auto px-6 sm:px-8 py-16 sm:py-24 text-center border-t border-white/[0.08]">
        <div className="font-mono text-xs text-[#85889A] uppercase tracking-widest mb-3">
          SYSTEM CLOSURE
        </div>
        <h3 className="font-grotesk text-2xl sm:text-3xl font-bold uppercase text-[#F2F2ED] mb-4">
          Integrated Brand Ecosystem
        </h3>
        <p className="text-sm sm:text-base text-[#85889A] leading-relaxed max-w-2xl mx-auto">
          {content.finalNotes}
        </p>
      </section>

      {/* 16. Next Project Navigation (Looping: BIMACME -> BUTTA BURGER -> NIKHIL KAPAHI -> BURGYARD -> BIMACME) */}
      <nav className="max-w-7xl mx-auto px-6 sm:px-8 pt-12 border-t border-white/[0.12]" aria-label="Project Navigation">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          <Link
            to={`/work/${prevProject.slug}`}
            className="group flex items-center gap-3 font-mono text-xs text-[#85889A] hover:text-[#A8FF00] uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <div>
              <span className="block text-[10px] text-[#85889A]/60">PREVIOUS PROJECT</span>
              <span className="font-grotesk text-base font-bold text-[#F2F2ED] group-hover:text-[#A8FF00]">
                {prevProject.name}
              </span>
            </div>
          </Link>

          <Link
            to="/work"
            className="font-mono text-xs text-[#85889A] hover:text-[#F2F2ED] uppercase tracking-widest px-4 py-2 border border-white/10 hover:border-white/30 transition-colors"
          >
            ALL PROJECTS
          </Link>

          <Link
            to={`/work/${nextProject.slug}`}
            className="group flex items-center gap-3 text-right font-mono text-xs text-[#85889A] hover:text-[#A8FF00] uppercase tracking-wider transition-colors"
          >
            <div>
              <span className="block text-[10px] text-[#85889A]/60">NEXT PROJECT</span>
              <span className="font-grotesk text-base font-bold text-[#F2F2ED] group-hover:text-[#A8FF00]">
                {nextProject.name}
              </span>
            </div>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </nav>
    </article>
  );
};

export default CaseStudyPage;

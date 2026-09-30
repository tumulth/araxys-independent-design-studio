import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { Project } from '../data/projects';
import { ClientVisualWorld } from './visuals/ClientVisualWorld';

interface LightboxProps {
  project: Project;
  activeIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  project,
  activeIndex,
  isOpen,
  onClose,
  onNext,
  onPrev
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen) return null;

  const currentItem = project.media.gallery[activeIndex];

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#03040A]/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 select-none"
      role="dialog"
      aria-modal="true"
      aria-label="Media Lightbox"
    >
      {/* Lightbox Top Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-4 font-mono text-xs text-[#85889A]">
          <span className="text-[#A8FF00] font-semibold">{project.name}</span>
          <span>·</span>
          <span>ARTIFACT {String(activeIndex + 1).padStart(2, '0')} / {String(project.media.gallery.length).padStart(2, '0')}</span>
        </div>

        <button
          onClick={onClose}
          className="flex items-center gap-2 font-mono text-xs text-[#85889A] hover:text-[#A8FF00] uppercase tracking-wider px-3 py-1.5 border border-white/10 hover:border-[#A8FF00]/40 transition-colors"
          aria-label="Close Lightbox"
        >
          <span>CLOSE [ESC]</span>
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Visual Display */}
      <div className="relative my-auto max-w-6xl w-full mx-auto flex items-center justify-center p-4">
        {/* Navigation Arrows */}
        <button
          onClick={onPrev}
          className="absolute left-2 sm:left-4 z-20 w-12 h-12 rounded-full border border-white/10 bg-black/60 hover:bg-black hover:border-[#A8FF00] flex items-center justify-center text-white hover:text-[#A8FF00] transition-colors focus:outline-none"
          aria-label="Previous artifact"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="max-w-5xl w-full aspect-[16/10] max-h-[72vh] rounded-sm overflow-hidden border border-white/10 shadow-2xl relative">
          <ClientVisualWorld
            project={project}
            type="gallery"
            index={activeIndex}
            imageSrc={currentItem?.src}
            caption={currentItem?.caption}
          />
        </div>

        <button
          onClick={onNext}
          className="absolute right-2 sm:right-4 z-20 w-12 h-12 rounded-full border border-white/10 bg-black/60 hover:bg-black hover:border-[#A8FF00] flex items-center justify-center text-white hover:text-[#A8FF00] transition-colors focus:outline-none"
          aria-label="Next artifact"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Lightbox Bottom Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-white/10 pt-4 font-mono text-xs text-[#85889A] gap-2">
        <div className="text-[#F2F2ED]">
          {currentItem?.caption || 'System design artifact specification'}
        </div>
        <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest">
          <span>KEYBOARD: [← / →] TO NAVIGATE</span>
          <span>·</span>
          <span>HIGH-RESOLUTION ARCHIVE</span>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;

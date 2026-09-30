import React, { useEffect, useRef } from 'react';
import { MEDIA } from '../../data/media';

interface IntroVideoProps {
  onComplete: () => void;
}

/**
 * 03 — HOMEPAGE INTRO VIDEO (Standalone wrapper)
 * Plays the actual uploaded "home pg loading animation.mp4" video.
 * Occupies full viewport, plays muted autoplay.
 * The video's natural `ended` event determines when the intro completes.
 * No timeouts, no arbitrary fades.
 */
export const IntroVideo: React.FC<IntroVideoProps> = ({ onComplete }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    const handleEnded = () => {
      onComplete();
    };

    video.addEventListener('ended', handleEnded, { once: true });

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('Autoplay prevented:', err);
      });
    }

    return () => {
      video.removeEventListener('ended', handleEnded);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-[#03040A] flex items-center justify-center select-none overflow-hidden">
      <video
        ref={videoRef}
        src={MEDIA.introVideo}
        playsInline
        muted
        autoPlay
        preload="auto"
        className="w-full h-full object-cover object-center"
      />

      {/* Discreet skip control */}
      <button
        onClick={onComplete}
        className="absolute bottom-6 right-6 z-20 font-mono text-[10px] tracking-[0.2em] text-[#85889A] hover:text-[#A8FF00] uppercase transition-colors px-3 py-1.5 border border-white/10 hover:border-[#A8FF00]/40 backdrop-blur-md bg-[#03040A]/40"
        aria-label="Skip Intro"
      >
        SKIP INTRO [ESC]
      </button>
    </div>
  );
};

export default IntroVideo;

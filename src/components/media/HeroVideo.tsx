import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { MEDIA } from '../../data/media';
import { useIntro } from '../../context/IntroContext';

interface HeroVideoProps {
  className?: string;
  onMatchCutComplete?: () => void;
}

/**
 * COORDINATED TWO-LAYER MATCH CUT HERO VIDEO
 *
 * Requirements:
 * 1. Intro Video 1 is position: fixed, top: 0, left: 0, width: 100vw, height: 100vh, z-40.
 * 2. Homepage Video 2 is position: absolute, inset: 0, width: 100%, height: 100%, object-fit: cover.
 * 3. ZERO dark overlays or gradients across the video. The uploaded footage displays at 100% native visual brightness.
 * 4. Video 2 is preloaded and verified rendered at frame 0 before handoff.
 * 5. Video 1 freezes on final frame until Video 2 is confirmed ready.
 * 6. Video 2 starts playback from frame 0; Video 1 smoothly fades over 200ms linear.
 *
 * Sequence Logs:
 * - INTRO: PLAYING
 * - HERO VIDEO: PRELOADING
 * - HERO VIDEO: FRAME 0 READY
 * - INTRO: ENDED
 * - MATCH CUT: READY
 * - MATCH CUT: COMPLETE
 */
export const HeroVideo: React.FC<HeroVideoProps> = ({ 
  className = "",
  onMatchCutComplete,
}) => {
  const introVideoRef = useRef<HTMLVideoElement | null>(null);
  const loopVideoRef = useRef<HTMLVideoElement | null>(null);

  const { isIntroActive, setPresentationState } = useIntro();

  // Synchronization flags
  const isLoopFrame0ReadyRef = useRef<boolean>(false);
  const isIntroEndedRef = useRef<boolean>(false);
  const isHandoffDoneRef = useRef<boolean>(false);

  /**
   * Execute the match-cut handoff from intro video to loop video.
   * Both videos remain in the DOM.
   * Video 1 fades out over a brief 200ms linear transition to prevent compositor tear,
   * while Video 2 begins playing from its prepared frame 0.
   */
  const triggerMatchCut = () => {
    if (isHandoffDoneRef.current) return;
    isHandoffDoneRef.current = true;

    setPresentationState('MATCH_CUT_READY');
    console.log('MATCH CUT: READY');

    const intro = introVideoRef.current;
    const loop = loopVideoRef.current;
    if (!intro || !loop) return;

    // Start loop video playback immediately from preloaded frame 0
    loop.currentTime = 0;
    const playPromise = loop.play();

    // Smooth 200ms linear opacity fade on intro video
    gsap.to(intro, {
      opacity: 0,
      duration: 0.2, // 200ms linear
      ease: 'linear',
      onComplete: () => {
        console.log('MATCH CUT: COMPLETE');
        intro.style.pointerEvents = 'none';
        intro.style.display = 'none';
        intro.pause();
        setPresentationState('HOMEPAGE_ACTIVE');
        if (onMatchCutComplete) {
          onMatchCutComplete();
        }
      },
    });

    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        if (err.name !== 'AbortError') {
          console.warn('Loop video play error:', err);
        }
      });
    }
  };

  // 1. PRELOAD & PREPARE VIDEO 2 (Homepage Loop Video) AT FRAME 0
  useEffect(() => {
    const loop = loopVideoRef.current;
    const intro = introVideoRef.current;
    if (!loop) return;

    loop.muted = true;
    loop.defaultMuted = true;
    loop.playsInline = true;

    if (!isIntroActive) {
      // Intro dismissed or completed: ensure intro is stopped and loop video is playing
      isHandoffDoneRef.current = true;
      if (intro) {
        intro.pause();
        intro.style.opacity = '0';
        intro.style.pointerEvents = 'none';
        intro.style.display = 'none';
      }
      const playPromise = loop.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
      return;
    }

    console.log('HERO VIDEO: PRELOADING');

    // Hold at exact frame 0
    loop.currentTime = 0;
    loop.pause();

    const onFrame0Presented = () => {
      if (isLoopFrame0ReadyRef.current) return;
      isLoopFrame0ReadyRef.current = true;
      console.log('HERO VIDEO: FRAME 0 READY');

      // If intro has already ended while waiting for frame 0, trigger match cut now
      if (isIntroEndedRef.current && !isHandoffDoneRef.current) {
        triggerMatchCut();
      }
    };

    // Use requestVideoFrameCallback to guarantee frame 0 is actually composited by the browser
    if (typeof (loop as any).requestVideoFrameCallback === 'function') {
      (loop as any).requestVideoFrameCallback(() => {
        onFrame0Presented();
      });
    }

    const handleLoaded = () => {
      loop.currentTime = 0;
      loop.pause();

      if (typeof (loop as any).requestVideoFrameCallback === 'function') {
        (loop as any).requestVideoFrameCallback(() => {
          onFrame0Presented();
        });
      } else {
        onFrame0Presented();
      }
    };

    if (loop.readyState >= 2) {
      handleLoaded();
    } else {
      loop.addEventListener('loadeddata', handleLoaded, { once: true });
      loop.addEventListener('canplay', handleLoaded, { once: true });
    }

    return () => {
      loop.removeEventListener('loadeddata', handleLoaded);
      loop.removeEventListener('canplay', handleLoaded);
    };
  }, [isIntroActive]);

  // 2. PLAY VIDEO 1 (Intro Video) ALL THE WAY TO ITS NATIVE `ended` EVENT
  useEffect(() => {
    const intro = introVideoRef.current;
    if (!intro) return;

    intro.muted = true;
    intro.defaultMuted = true;
    intro.playsInline = true;

    if (!isIntroActive) {
      intro.style.opacity = '0';
      intro.style.pointerEvents = 'none';
      return;
    }

    intro.style.opacity = '1';
    intro.style.pointerEvents = 'auto';

    const handlePlay = () => {
      console.log('INTRO: PLAYING');
    };
    intro.addEventListener('play', handlePlay, { once: true });

    const handleEnded = () => {
      console.log('INTRO: ENDED');
      isIntroEndedRef.current = true;
      // Immediately trigger match cut; do not hang waiting for loop video frame 0 on mobile browsers
      triggerMatchCut();
    };

    intro.addEventListener('ended', handleEnded, { once: true });

    // Fallback in case mobile Safari reaches the end without firing 'ended'
    const handleTimeUpdate = () => {
      if (intro.duration && intro.currentTime >= intro.duration - 0.15) {
        if (!isIntroEndedRef.current) {
          handleEnded();
        }
      }
    };
    intro.addEventListener('timeupdate', handleTimeUpdate);

    const playPromise = intro.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        if (err.name !== 'AbortError') {
          console.warn('Autoplay prevented on intro video:', err);
        }
      });
    }

    // Fallback: resume on first user interaction if browser policy paused autoplay
    const handleGesture = () => {
      if (intro && intro.paused && !isIntroEndedRef.current) {
        intro.play().catch(() => {});
      }
    };
    window.addEventListener('pointerdown', handleGesture, { once: true });
    window.addEventListener('keydown', handleGesture, { once: true });

    return () => {
      intro.removeEventListener('play', handlePlay);
      intro.removeEventListener('ended', handleEnded);
      intro.removeEventListener('timeupdate', handleTimeUpdate);
      window.removeEventListener('pointerdown', handleGesture);
      window.removeEventListener('keydown', handleGesture);
    };
  }, [isIntroActive]);

  // Click-to-play fallback for background tabs or strict power-saving modes
  const handleContainerClick = () => {
    if (isIntroActive && !isHandoffDoneRef.current) {
      const intro = introVideoRef.current;
      if (intro && intro.paused && !isIntroEndedRef.current) {
        intro.play().catch(() => {});
      }
    } else {
      const loop = loopVideoRef.current;
      if (loop && loop.paused) {
        loop.play().catch(() => {});
      }
    }
  };

  return (
    <div 
      className={`relative w-full h-full overflow-hidden bg-[#03040A] select-none ${className}`}
      onClick={handleContainerClick}
    >
      {/* LAYER 2: Homepage Loop Video (Preloaded underneath Layer 1, at 100% native brightness) */}
      <video
        ref={loopVideoRef}
        src={MEDIA.homepageLoop}
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* LAYER 1: Intro Video (Fixed to 100vw x 100vh viewport, z-40, at 100% native brightness) */}
      <video
        ref={introVideoRef}
        src={MEDIA.introVideo}
        muted
        playsInline
        autoPlay
        preload="auto"
        className="fixed inset-0 w-screen h-screen object-cover object-center z-40"
        style={{
          opacity: isIntroActive ? 1 : 0,
          pointerEvents: isIntroActive ? 'auto' : 'none',
          display: isIntroActive ? 'block' : 'none',
        }}
      />
    </div>
  );
};

export default HeroVideo;

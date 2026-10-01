import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { HeroVideo } from '../components/media/HeroVideo';
import { useIntro } from '../context/IntroContext';

/**
 * ARAXYS UNIFIED CINEMATIC HERO & SCROLL SEQUENCE STAGE
 *
 * One Continuous Cinematic Stage:
 * 1. INITIAL STATE (progress = 0):
 *    - Looping hero video (home pg loop video.mp4 at 100% native brightness)
 *    - Reference typography: INDEPENDENT DESIGN STUDIO, WE MAKE BRANDS IMPOSSIBLE TO IGNORE
 *    - Supporting copy & scroll indicator
 * 2. SCROLL BEGINS (progress 0.0 -> 0.10):
 *    - Hero text translates upward and fades out
 *    - Canvas showing Frame 001 fades in over the video in the exact same stage
 *    - Video area remains visually pinned
 * 3. SCRUB PHASE (progress 0.10 -> 0.72):
 *    - Continuous, reversible scrub through Frames 001 -> 140
 *    - Shards burst and disperse, clearing dark center
 * 4. HOLD & SYSTEM STATEMENT (progress 0.72 -> 1.00):
 *    - Frame 140 holds fixed on the canvas
 *    - "WE BUILD VISUAL SYSTEMS." (white / lime green / white) reveals
 * 5. UNPIN (progress > 1.00):
 *    - Cinematic stage unpins naturally into Selected Work
 */

const FRAME_COUNT = 140;
const FRAME_DIRECTORY = '/assets/Scroll Frames 01/';
const FRAME_PREFIX = 'ezgif-frame-';
const FRAME_EXTENSION = '.jpg';
const FRAME_PADDING = 3;

const getFrameUrl = (index: number): string => {
  const frameNum = String(index + 1).padStart(FRAME_PADDING, '0');
  return `${FRAME_DIRECTORY}${FRAME_PREFIX}${frameNum}${FRAME_EXTENSION}`;
};

// Global in-memory image cache to avoid duplicate network downloads
const imageCache: HTMLImageElement[] = new Array(FRAME_COUNT);
let isPreloadingInitiated = false;

const preloadSequenceFrames = (onFrame1Ready?: () => void) => {
  if (isPreloadingInitiated) {
    if (imageCache[0]?.complete && imageCache[0]?.naturalWidth > 0 && onFrame1Ready) {
      onFrame1Ready();
    }
    return;
  }
  isPreloadingInitiated = true;

  // 1. Preload Frame 1 immediately
  const frame1 = new Image();
  frame1.onload = () => {
    imageCache[0] = frame1;
    if (onFrame1Ready) onFrame1Ready();
  };
  frame1.src = getFrameUrl(0);
  imageCache[0] = frame1;

  if (frame1.complete && frame1.naturalWidth > 0 && onFrame1Ready) {
    onFrame1Ready();
  }

  // 2. Preload remaining 139 frames in background
  for (let i = 1; i < FRAME_COUNT; i++) {
    const img = new Image();
    img.onload = () => {
      imageCache[i] = img;
    };
    img.src = getFrameUrl(i);
    imageCache[i] = img;
  }
};

const getUsableFrame = (targetIndex: number): HTMLImageElement | null => {
  if (imageCache[targetIndex]?.complete && imageCache[targetIndex]?.naturalWidth > 0) {
    return imageCache[targetIndex];
  }
  // Search backward first
  for (let i = targetIndex - 1; i >= 0; i--) {
    if (imageCache[i]?.complete && imageCache[i]?.naturalWidth > 0) {
      return imageCache[i];
    }
  }
  // Search forward as fallback
  for (let i = targetIndex + 1; i < FRAME_COUNT; i++) {
    if (imageCache[i]?.complete && imageCache[i]?.naturalWidth > 0) {
      return imageCache[i];
    }
  }
  return null;
};

export const Hero: React.FC = () => {
  const wrapperRef = useRef<HTMLElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const bgVideoRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroContentRef = useRef<HTMLDivElement | null>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement | null>(null);
  const completionTextRef = useRef<HTMLDivElement | null>(null);
  const atmosphericMidgroundRef = useRef<HTMLDivElement | null>(null);

  // Staggered Entrance Animation Element Refs
  const topLabelRef = useRef<HTMLDivElement | null>(null);
  const headlineLine1Ref = useRef<HTMLSpanElement | null>(null);
  const headlineLine2Ref = useRef<HTMLSpanElement | null>(null);
  const headlineLine3Ref = useRef<HTMLSpanElement | null>(null);
  const headlineLine4Ref = useRef<HTMLSpanElement | null>(null);
  const supportingTextRef = useRef<HTMLParagraphElement | null>(null);
  const scrollBtnRef = useRef<HTMLButtonElement | null>(null);

  const entranceTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasAnimatedRef = useRef<boolean>(false);
  const wasScrolledRef = useRef<boolean>(false);

  // Canvas render & scroll RAF tracking
  const currentFrameIndexRef = useRef<number>(0);
  const targetFrameIndexRef = useRef<number>(0);
  const rafRenderIdRef = useRef<number>(0);
  const rafScrollIdRef = useRef<number>(0);

  const { 
    presentationState, 
    setPresentationState, 
    isIntroActive,
    isScrollLocked, 
    skipIntro, 
    unlockScroll 
  } = useIntro();

  const [hasEntered, setHasEntered] = useState<boolean>(() => presentationState === 'SCROLL_UNLOCKED');

  /**
   * Draw target frame to the canvas maintaining aspect ratio with object-fit: cover logic.
   */
  const renderCanvas = () => {
    rafRenderIdRef.current = 0;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    if (w === 0 || h === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const targetW = Math.round(w * dpr);
    const targetH = Math.round(h * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const img = getUsableFrame(targetFrameIndexRef.current);
    if (!img || !img.complete || img.naturalWidth === 0) {
      ctx.fillStyle = '#03040A';
      ctx.fillRect(0, 0, w, h);
      return;
    }

    currentFrameIndexRef.current = targetFrameIndexRef.current;

    const nw = img.naturalWidth;
    const nh = img.naturalHeight;
    const scale = Math.max(w / nw, h / nh);
    const sw = nw * scale;
    const sh = nh * scale;
    const ox = (w - sw) * 0.5;
    const oy = (h - sh) * 0.5;

    ctx.drawImage(img, ox, oy, sw, sh);
  };

  const scheduleRender = (frameIndex: number) => {
    targetFrameIndexRef.current = frameIndex;
    if (!rafRenderIdRef.current) {
      rafRenderIdRef.current = requestAnimationFrame(renderCanvas);
    }
  };

  /**
   * Continuous scroll progress calculation driving the unified cinematic stage:
   *
   * 0.00 -> 0.10: Hero text slides up and fades away. Canvas fades in showing Frame 001.
   * 0.10 -> 0.72: Sequence scrubs through all 140 frames (001 -> 140) reversibly.
   * 0.72 -> 0.85: Frame 140 holds; "WE BUILD VISUAL SYSTEMS." fades and slides in.
   * 0.85 -> 1.00: Frame 140 and "WE BUILD VISUAL SYSTEMS." hold in full view.
   * > 1.00: Naturally unpins and page continues into Selected Work.
   */
  const handleScrollUpdate = () => {
    rafScrollIdRef.current = 0;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const rect = wrapper.getBoundingClientRect();
    const windowH = window.innerHeight;
    const totalScrollDistance = rect.height - windowH;

    if (totalScrollDistance <= 0) return;

    const scrolled = -rect.top;
    const progress = Math.min(1, Math.max(0, scrolled / totalScrollDistance));

    const canvas = canvasRef.current;
    const atmosphericMidground = atmosphericMidgroundRef.current;
    const heroContent = heroContentRef.current;
    const scrollIndicator = scrollIndicatorRef.current;
    const completionText = completionTextRef.current;

    // Initial position: do not interfere with GSAP entrance if user hasn't scrolled
    if (progress <= 0) {
      if (wasScrolledRef.current) {
        if (canvas) {
          canvas.style.opacity = '0';
          canvas.style.transform = 'translateY(0px) scale(1)';
        }
        if (atmosphericMidground) {
          atmosphericMidground.style.opacity = '0';
          atmosphericMidground.style.transform = 'translateY(0px) scale(1)';
        }
        if (heroContent) {
          heroContent.style.opacity = '1';
          heroContent.style.transform = 'translateY(0px)';
          heroContent.style.pointerEvents = 'auto';
        }
        if (scrollIndicator) {
          scrollIndicator.style.opacity = '1';
          scrollIndicator.style.transform = 'translateY(0px)';
        }
        if (completionText) {
          completionText.style.opacity = '0';
          completionText.style.transform = 'translateY(30px) scale(1)';
          completionText.style.pointerEvents = 'none';
        }
        scheduleRender(0);
        wasScrolledRef.current = false;
      }
      return;
    }

    wasScrolledRef.current = true;

    // 1. Phase 1: Hero text exit & Canvas takeover (progress 0.00 -> 0.10)
    if (progress < 0.10) {
      const exitRatio = progress / 0.10; // 0.0 -> 1.0

      // Canvas fades in over looping video
      if (canvas) {
        canvas.style.opacity = String(exitRatio);
        canvas.style.transform = 'translateY(0px) scale(1)';
      }

      if (atmosphericMidground) {
        atmosphericMidground.style.opacity = '0';
        atmosphericMidground.style.transform = 'translateY(0px) scale(1)';
      }

      // Hero text moves upward and fades out
      if (heroContent) {
        const textOpacity = 1 - exitRatio;
        const translateY = -exitRatio * 80; // 0 -> -80px
        heroContent.style.opacity = String(textOpacity);
        heroContent.style.transform = `translateY(${translateY}px)`;
        heroContent.style.pointerEvents = textOpacity > 0.3 ? 'auto' : 'none';
      }

      // Scroll indicator fades out quickly
      if (scrollIndicator) {
        const indOpacity = Math.max(0, 1 - progress / 0.04);
        scrollIndicator.style.opacity = String(indOpacity);
        scrollIndicator.style.transform = `translateY(-${(1 - indOpacity) * 15}px)`;
      }

      // Canvas holds Frame 001
      scheduleRender(0);

      // Completion text hidden
      if (completionText) {
        completionText.style.opacity = '0';
        completionText.style.transform = 'translateY(30px) scale(1)';
        completionText.style.pointerEvents = 'none';
      }
    }
    // 2. Phase 2: Frame Sequence Scrub (progress 0.10 -> 0.70)
    else if (progress <= 0.70) {
      if (canvas) {
        canvas.style.opacity = '1';
        canvas.style.transform = 'translateY(0px) scale(1)';
      }

      if (atmosphericMidground) {
        atmosphericMidground.style.opacity = '0';
        atmosphericMidground.style.transform = 'translateY(0px) scale(1)';
      }

      if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(-80px)';
        heroContent.style.pointerEvents = 'none';
      }

      if (scrollIndicator) {
        scrollIndicator.style.opacity = '0';
      }

      const scrubRatio = (progress - 0.10) / (0.70 - 0.10);
      const frameIndex = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(scrubRatio * (FRAME_COUNT - 1))));
      scheduleRender(frameIndex);

      if (completionText) {
        completionText.style.opacity = '0';
        completionText.style.transform = 'translateY(30px) scale(1)';
        completionText.style.pointerEvents = 'none';
      }
    }
    // 3. Phase 3: Hold Frame 140 & Reveal "WE BUILD VISUAL SYSTEMS." (progress 0.70 -> 0.84)
    // 4. Phase 4: Multi-Plane Depth Parallax into Selected Work (progress 0.84 -> 1.00)
    else {
      if (canvas) {
        canvas.style.opacity = '1';
      }

      if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.pointerEvents = 'none';
      }

      if (scrollIndicator) {
        scrollIndicator.style.opacity = '0';
      }

      // Hold Frame 140
      scheduleRender(FRAME_COUNT - 1);

      // Sub-phase 3A: Text reveal (progress 0.70 -> 0.80)
      if (progress <= 0.80) {
        if (canvas) {
          canvas.style.transform = 'translateY(0px) scale(1)';
        }
        if (atmosphericMidground) {
          atmosphericMidground.style.opacity = '0';
          atmosphericMidground.style.transform = 'translateY(0px) scale(1)';
        }

        if (completionText) {
          const textRatio = (progress - 0.70) / (0.80 - 0.70); // 0.0 -> 1.0
          completionText.style.opacity = String(textRatio);
          completionText.style.transform = `translateY(${(1 - textRatio) * 30}px) scale(1)`;
          completionText.style.pointerEvents = textRatio > 0.5 ? 'auto' : 'none';
        }
      }
      // Sub-phase 3B: Full hold of Frame 140 + "WE BUILD VISUAL SYSTEMS." (progress 0.80 -> 0.84)
      else if (progress <= 0.84) {
        if (canvas) {
          canvas.style.transform = 'translateY(0px) scale(1)';
        }
        if (atmosphericMidground) {
          atmosphericMidground.style.opacity = '0';
          atmosphericMidground.style.transform = 'translateY(0px) scale(1)';
        }

        if (completionText) {
          completionText.style.opacity = '1';
          completionText.style.transform = 'translateY(0px) scale(1)';
          completionText.style.pointerEvents = 'auto';
        }
      }
      // Sub-phase 4: Cinematic Layered Parallax Transition (progress 0.84 -> 1.00)
      // BACKGROUND (0.5x) -> MIDGROUND (0.7x) -> FOREGROUND (1.0x)
      else {
        const p = Math.min(1, Math.max(0, (progress - 0.84) / (1.00 - 0.84))); // 0.0 -> 1.0
        const BASE_MOVE = 90; // Foreground travel distance in px

        // LAYER 1 — BACKGROUND: Canvas Frame 140 (moves slowest at 0.5x, subtle distant scale)
        if (canvas) {
          const canvasY = -p * (0.5 * BASE_MOVE); // 0px -> -45px
          const canvasScale = 1.0 - (p * 0.02);   // 1.0 -> 0.98
          canvas.style.transform = `translateY(${canvasY.toFixed(1)}px) scale(${canvasScale.toFixed(4)})`;
          canvas.style.transformOrigin = 'center center';
          canvas.style.opacity = '1';
        }

        // LAYER 2 — ATMOSPHERIC MIDGROUND (moves at 0.7x, subtle CRT scanlines & dark tint)
        if (atmosphericMidground) {
          const midY = -p * (0.7 * BASE_MOVE);    // 0px -> -63px
          const midScale = 1.0 + (p * 0.01);      // 1.0 -> 1.01
          const midOpacity = p * 0.38;            // 0.0 -> 0.38
          atmosphericMidground.style.transform = `translateY(${midY.toFixed(1)}px) scale(${midScale.toFixed(4)})`;
          atmosphericMidground.style.transformOrigin = 'center center';
          atmosphericMidground.style.opacity = String(midOpacity.toFixed(3));
        }

        // LAYER 3 — FOREGROUND: Typography "WE BUILD VISUAL SYSTEMS." (moves fastest at 1.0x, exits upward)
        if (completionText) {
          const textY = -p * BASE_MOVE;           // 0px -> -90px
          const textScale = 1.0 + (p * 0.02);     // 1.0 -> 1.02
          // Hold full opacity for first 60% of travel, then gently fade out as it exits
          const textOpacity = p <= 0.60 ? 1.0 : Math.max(0, 1.0 - ((p - 0.60) / 0.40));
          completionText.style.transform = `translateY(${textY.toFixed(1)}px) scale(${textScale.toFixed(4)})`;
          completionText.style.transformOrigin = 'center center';
          completionText.style.opacity = String(textOpacity.toFixed(3));
          completionText.style.pointerEvents = textOpacity > 0.2 ? 'auto' : 'none';
        }
      }
    }
  };

  const onScroll = () => {
    if (!rafScrollIdRef.current) {
      rafScrollIdRef.current = requestAnimationFrame(handleScrollUpdate);
    }
  };

  const handleResize = () => {
    handleScrollUpdate();
    scheduleRender(currentFrameIndexRef.current);
  };

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight * 0.95,
      behavior: 'smooth'
    });
  };

  /**
   * Run the cinematic GSAP entrance animation for the hero text.
   * Triggered strictly after the intro video match cut completes.
   */
  const runEntranceAnimation = () => {
    if (hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    const isMobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;

    if (isMobile) {
      // On mobile, immediately unlock scroll and reveal hero text so user can swipe on first touch
      unlockScroll();
      setHasEntered(true);
      const topLabel = topLabelRef.current;
      const headlineLine1 = headlineLine1Ref.current;
      const headlineLine2 = headlineLine2Ref.current;
      const headlineLine3 = headlineLine3Ref.current;
      const headlineLine4 = headlineLine4Ref.current;
      const supportingText = supportingTextRef.current;
      const scrollBtn = scrollBtnRef.current;

      const tl = gsap.timeline();
      tl.fromTo(topLabel, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 0);
      tl.fromTo(headlineLine1, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0.05);
      tl.fromTo(headlineLine2, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0.1);
      tl.fromTo(headlineLine3, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0.15);
      tl.fromTo(headlineLine4, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0.2);
      tl.fromTo(supportingText, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0.25);
      tl.fromTo(scrollBtn, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 0.3);
      return;
    }

    setPresentationState('HERO_TEXT_DELAY');

    const topLabel = topLabelRef.current;
    const headlineLine1 = headlineLine1Ref.current;
    const headlineLine2 = headlineLine2Ref.current;
    const headlineLine3 = headlineLine3Ref.current;
    const headlineLine4 = headlineLine4Ref.current;
    const supportingText = supportingTextRef.current;
    const scrollBtn = scrollBtnRef.current;

    if (!topLabel || !headlineLine1 || !headlineLine2 || !headlineLine3 || !headlineLine4 || !supportingText || !scrollBtn) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      const tl = gsap.timeline({
        delay: 1.5,
        onStart: () => {
          setPresentationState('HERO_REVEAL');
        },
        onComplete: () => {
          setHasEntered(true);
          unlockScroll();
        },
      });

      tl.fromTo(topLabel, { opacity: 0, y: 0 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0);
      tl.fromTo(headlineLine1, { opacity: 0, y: 0 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0.08);
      tl.fromTo(headlineLine2, { opacity: 0, y: 0 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0.16);
      tl.fromTo(headlineLine3, { opacity: 0, y: 0 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0.24);
      tl.fromTo(headlineLine4, { opacity: 0, y: 0 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0.32);
      tl.fromTo(supportingText, { opacity: 0, y: 0 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0.42);
      tl.fromTo(scrollBtn, { opacity: 0, y: 0 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0.55);
      return;
    }

    gsap.set(topLabel, { opacity: 0, y: 25 });
    gsap.set(headlineLine1, { opacity: 0, y: 35 });
    gsap.set(headlineLine2, { opacity: 0, y: 35 });
    gsap.set(headlineLine3, { opacity: 0, y: 35 });
    gsap.set(headlineLine4, { opacity: 0, y: 35 });
    gsap.set(supportingText, { opacity: 0, y: 25 });
    gsap.set(scrollBtn, { opacity: 0, y: 20 });

    const tl = gsap.timeline({
      delay: 1.5,
      onStart: () => {
        setPresentationState('HERO_REVEAL');
      },
      onComplete: () => {
        setHasEntered(true);
        unlockScroll();
      },
    });

    entranceTimelineRef.current = tl;

    tl.fromTo(topLabel, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }, 0);
    tl.fromTo(headlineLine1, { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }, 0.12);
    tl.fromTo(headlineLine2, { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }, 0.22);
    tl.fromTo(headlineLine3, { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }, 0.32);
    tl.fromTo(headlineLine4, { opacity: 0, y: 35 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }, 0.42);
    tl.fromTo(supportingText, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }, 0.55);
    tl.fromTo(scrollBtn, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, 0.70);
  };

  // If intro was skipped or already completed in session, immediately reveal hero text
  useEffect(() => {
    if (presentationState === 'SCROLL_UNLOCKED' && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true;
      if (entranceTimelineRef.current) {
        entranceTimelineRef.current.kill();
      }
      setHasEntered(true);
      const topLabel = topLabelRef.current;
      const headlineLine1 = headlineLine1Ref.current;
      const headlineLine2 = headlineLine2Ref.current;
      const headlineLine3 = headlineLine3Ref.current;
      const headlineLine4 = headlineLine4Ref.current;
      const supportingText = supportingTextRef.current;
      const scrollBtn = scrollBtnRef.current;

      if (topLabel) gsap.set(topLabel, { opacity: 1, y: 0 });
      if (headlineLine1) gsap.set(headlineLine1, { opacity: 1, y: 0 });
      if (headlineLine2) gsap.set(headlineLine2, { opacity: 1, y: 0 });
      if (headlineLine3) gsap.set(headlineLine3, { opacity: 1, y: 0 });
      if (headlineLine4) gsap.set(headlineLine4, { opacity: 1, y: 0 });
      if (supportingText) gsap.set(supportingText, { opacity: 1, y: 0 });
      if (scrollBtn) gsap.set(scrollBtn, { opacity: 1, y: 0 });

      scheduleRender(0);
      handleScrollUpdate();
    }
  }, [presentationState]);

  const handleMatchCutComplete = () => {
    runEntranceAnimation();
  };

  const handleSkip = () => {
    hasAnimatedRef.current = true;
    skipIntro();
    if (entranceTimelineRef.current) {
      entranceTimelineRef.current.kill();
    }
    setHasEntered(true);

    const topLabel = topLabelRef.current;
    const headlineLine1 = headlineLine1Ref.current;
    const headlineLine2 = headlineLine2Ref.current;
    const headlineLine3 = headlineLine3Ref.current;
    const headlineLine4 = headlineLine4Ref.current;
    const supportingText = supportingTextRef.current;
    const scrollBtn = scrollBtnRef.current;

    if (topLabel) gsap.set(topLabel, { opacity: 1, y: 0 });
    if (headlineLine1) gsap.set(headlineLine1, { opacity: 1, y: 0 });
    if (headlineLine2) gsap.set(headlineLine2, { opacity: 1, y: 0 });
    if (headlineLine3) gsap.set(headlineLine3, { opacity: 1, y: 0 });
    if (headlineLine4) gsap.set(headlineLine4, { opacity: 1, y: 0 });
    if (supportingText) gsap.set(supportingText, { opacity: 1, y: 0 });
    if (scrollBtn) gsap.set(scrollBtn, { opacity: 1, y: 0 });

    scheduleRender(0);
    handleScrollUpdate();
  };

  // Preload sequence frames and mount scroll listener
  useEffect(() => {
    preloadSequenceFrames(() => {
      scheduleRender(0);
    });

    scheduleRender(0);
    handleScrollUpdate();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleResize);
      if (rafRenderIdRef.current) {
        cancelAnimationFrame(rafRenderIdRef.current);
      }
      if (rafScrollIdRef.current) {
        cancelAnimationFrame(rafScrollIdRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={wrapperRef}
      className="relative w-full h-[260vh] bg-[#03040A]"
    >
      {/* Sticky Cinematic Viewport Stage (100vh pinned) */}
      <div 
        ref={stickyRef}
        className="sticky top-0 w-full h-screen min-h-[640px] overflow-hidden flex flex-col justify-between items-center bg-[#03040A] text-center"
      >
        {/* LAYER 1: Background Looping Video Stage (Z-0) */}
        <div 
          ref={bgVideoRef}
          className="absolute inset-0 z-0 will-change-transform"
        >
          <HeroVideo 
            className="w-full h-full" 
            onMatchCutComplete={handleMatchCutComplete}
          />
        </div>

        {/* LAYER 2: Image Sequence Canvas (Z-10, initially opacity 0, fades in smoothly on scroll) */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-10 w-full h-full block pointer-events-none transition-opacity duration-150 ease-out"
          style={{ opacity: 0 }}
        />

        {/* LAYER 2: Atmospheric Midground (Z-15, CRT scanlines & dark depth plane, moves at 0.7x) */}
        <div
          ref={atmosphericMidgroundRef}
          className="absolute inset-0 pointer-events-none will-change-transform"
          style={{ opacity: 0, zIndex: 15 }}
        >
          <div className="absolute inset-0 bg-[#03040A] opacity-80" />
          <div className="absolute inset-0 crt-scanlines opacity-50" />
        </div>

        {/* Top spacer for navbar clearance */}
        <div className="relative z-20 pt-16 sm:pt-20 w-full shrink-0 pointer-events-none" />

        {/* Discreet skip intro button (available while intro is actively playing) */}
        {isIntroActive && (
          <button
            onClick={handleSkip}
            className="fixed bottom-6 right-6 z-50 font-mono text-[10px] tracking-[0.2em] text-[#85889A] hover:text-[#A8FF00] uppercase transition-colors px-3 py-1.5 border border-white/10 hover:border-[#A8FF00]/40 backdrop-blur-md bg-[#03040A]/40 touch-manipulation cursor-pointer"
            aria-label="Skip Intro"
          >
            SKIP INTRO [ESC]
          </button>
        )}

        {/* LAYER 3: Main Hero Content Block (Option A: Asymmetrical Editorial Composition) */}
        <div 
          ref={heroContentRef}
          className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 w-full mt-auto mb-4 sm:mb-6 will-change-transform select-none"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-end w-full">
            {/* LOWER-LEFT: Studio Information & Main Headline */}
            <div className="lg:col-span-7 xl:col-span-7 flex flex-col items-start text-left">
              {/* Technical Studio Metadata */}
              <div 
                ref={topLabelRef}
                className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#85889A] mb-3.5 sm:mb-4 text-left will-change-transform"
                style={{
                  textShadow: '0 2px 14px rgba(0, 0, 0, 0.9)',
                  opacity: hasEntered ? 1 : 0,
                  transform: hasEntered ? 'none' : 'translateY(25px)',
                }}
              >
                <div className="text-[#F2F2ED]/90 font-medium">INDEPENDENT DESIGN STUDIO</div>
                <div className="text-[#85889A] text-[9px] sm:text-[10px] tracking-[0.3em] mt-0.5">PUNE / INDIA</div>
                <div className="w-6 sm:w-7 h-[1.5px] bg-[#A8FF00] mt-2" />
              </div>

              {/* Main Headline (WE MAKE / BRANDS / IMPOSSIBLE / TO IGNORE.) */}
              <h1 
                className="font-grotesk font-extrabold tracking-[-0.04em] uppercase leading-[0.88] select-none text-left flex flex-col items-start"
                style={{
                  fontSize: 'clamp(2.5rem, 5.2vw, 5.75rem)',
                }}
              >
                <span 
                  ref={headlineLine1Ref}
                  className="block text-[#F2F2ED] will-change-transform"
                  style={{
                    textShadow: '0 4px 24px rgba(0, 0, 0, 0.85), 0 1px 4px rgba(0, 0, 0, 0.95)',
                    opacity: hasEntered ? 1 : 0,
                    transform: hasEntered ? 'none' : 'translateY(35px)',
                  }}
                >
                  WE MAKE
                </span>
                <span 
                  ref={headlineLine2Ref}
                  className="block text-[#F2F2ED] will-change-transform"
                  style={{
                    textShadow: '0 4px 24px rgba(0, 0, 0, 0.85), 0 1px 4px rgba(0, 0, 0, 0.95)',
                    opacity: hasEntered ? 1 : 0,
                    transform: hasEntered ? 'none' : 'translateY(35px)',
                  }}
                >
                  BRANDS
                </span>
                <span 
                  ref={headlineLine3Ref}
                  className="block text-[#A8FF00] will-change-transform"
                  style={{
                    textShadow: '0 4px 24px rgba(0, 0, 0, 0.85), 0 1px 4px rgba(0, 0, 0, 0.95)',
                    opacity: hasEntered ? 1 : 0,
                    transform: hasEntered ? 'none' : 'translateY(35px)',
                  }}
                >
                  IMPOSSIBLE
                </span>
                <span 
                  ref={headlineLine4Ref}
                  className="block text-[#F2F2ED] will-change-transform"
                  style={{
                    textShadow: '0 4px 24px rgba(0, 0, 0, 0.85), 0 1px 4px rgba(0, 0, 0, 0.95)',
                    opacity: hasEntered ? 1 : 0,
                    transform: hasEntered ? 'none' : 'translateY(35px)',
                  }}
                >
                  TO IGNORE.
                </span>
              </h1>
            </div>

            {/* LOWER-RIGHT: Supporting Copy */}
            <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-end lg:items-end w-full pb-1 sm:pb-2">
              <p 
                ref={supportingTextRef}
                className="text-xs sm:text-sm text-[#85889A] max-w-[320px] leading-relaxed text-left will-change-transform font-normal"
                style={{
                  textShadow: '0 2px 14px rgba(0, 0, 0, 0.95)',
                  opacity: hasEntered ? 1 : 0,
                  transform: hasEntered ? 'none' : 'translateY(25px)',
                }}
              >
                <span className="text-[#C4C7D4]">Brand identities, digital experiences, and social systems</span> for brands with somewhere to go.
              </p>
            </div>
          </div>
        </div>

        {/* LAYER 4: Bottom Scroll Indicator (Z-20, fades out on first scroll) */}
        <div 
          ref={scrollIndicatorRef}
          className="relative z-20 w-full pb-6 sm:pb-8 flex justify-center items-center will-change-transform shrink-0"
        >
          <button
            ref={scrollBtnRef}
            onClick={handleScrollDown}
            className="group inline-flex flex-col items-center gap-2.5 font-mono text-[9px] sm:text-[10px] text-[#85889A] hover:text-[#A8FF00] uppercase tracking-[0.35em] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#A8FF00]"
            style={{
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.85)',
              opacity: hasEntered ? 1 : 0,
              transform: hasEntered ? 'none' : 'translateY(20px)',
              willChange: 'opacity, transform',
            }}
            aria-label="Scroll to explore"
          >
            <svg 
              className="w-3.5 h-6 text-[#85889A] group-hover:text-[#A8FF00] group-hover:translate-y-1 transition-all duration-300" 
              viewBox="0 0 14 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.25"
              aria-hidden="true"
            >
              <line x1="7" y1="2" x2="7" y2="21" strokeLinecap="round" />
              <polyline points="3.5,17 7,21.5 10.5,17" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>SCROLL TO EXPLORE</span>
          </button>
        </div>

        {/* LAYER 5: Completion Statement Overlay (Z-30, reveals over Frame 140) */}
        <div 
          ref={completionTextRef}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-6 sm:px-8 select-none pointer-events-none"
          style={{
            opacity: 0,
            transform: 'translateY(30px)',
            willChange: 'opacity, transform',
          }}
        >
          {/* Subtle editorial vignette backdrop to ensure high contrast against Frame 140 */}
          <div className="absolute inset-0 bg-[#03040A]/40 backdrop-blur-[1px] pointer-events-none" />

          {/* Centered Bold Editorial Headline */}
          <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center justify-center">
            <h2 
              className="font-grotesk font-bold tracking-tight uppercase leading-[0.88] select-none text-center"
              style={{
                fontSize: 'clamp(3rem, 8vw, 7.5rem)',
                letterSpacing: '-0.04em',
                textShadow: '0 8px 32px rgba(0, 0, 0, 0.85), 0 2px 8px rgba(0, 0, 0, 0.95)',
              }}
            >
              <span className="block text-[#F2F2ED]">WE BUILD</span>
              <span className="block text-[#A8FF00]">VISUAL</span>
              <span className="block text-[#F2F2ED]">SYSTEMS.</span>
            </h2>
          </div>

          {/* Minimalist metadata coordinates */}
          <div className="absolute bottom-8 inset-x-0 z-20 max-w-7xl mx-auto px-6 sm:px-8 flex justify-between items-center font-mono text-[9px] sm:text-[10px] text-[#85889A] uppercase tracking-widest pointer-events-none">
            <span>ARAXYS // SEQUENCE 01</span>
            <span className="text-[#A8FF00]">SYSTEM STATEMENT</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

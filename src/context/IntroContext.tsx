import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Explicit Presentation State Machine
 *
 * Sequence:
 * INTRO_ACTIVE       -> Intro video 1 is playing fullscreen
 * INTRO_ENDED        -> Video 1 reaches exact final frame (frozen)
 * MATCH_CUT_READY    -> Video 2 (loop) frame 0 confirmed rendered
 * HOMEPAGE_ACTIVE    -> Video 2 begins playing, Video 1 fades 200ms linear
 * HERO_TEXT_DELAY    -> 1.5 second visual hold of native loop video
 * HERO_REVEAL        -> GSAP entrance timeline runs (fade + slide up)
 * SCROLL_UNLOCKED    -> Entrance complete: page scroll unlocks, scrollbar becomes available
 */
export type IntroPresentationState =
  | 'INTRO_ACTIVE'
  | 'INTRO_ENDED'
  | 'MATCH_CUT_READY'
  | 'HOMEPAGE_ACTIVE'
  | 'HERO_TEXT_DELAY'
  | 'HERO_REVEAL'
  | 'SCROLL_UNLOCKED';

interface IntroContextType {
  presentationState: IntroPresentationState;
  setPresentationState: (state: IntroPresentationState) => void;
  isIntroActive: boolean;
  isScrollLocked: boolean;
  skipIntro: () => void;
  unlockScroll: () => void;
}

const IntroContext = createContext<IntroContextType>({
  presentationState: 'SCROLL_UNLOCKED',
  setPresentationState: () => {},
  isIntroActive: false,
  isScrollLocked: false,
  skipIntro: () => {},
  unlockScroll: () => {},
});

export const useIntro = () => useContext(IntroContext);

// In-memory session tracking: on full page reload (F5 / browser refresh),
// hasPlayedInCurrentSession resets to false so the user can test the intro repeatedly.
// During client-side SPA navigation (/work -> /), it prevents re-triggering the intro.
let hasPlayedInCurrentSession = false;

export const IntroProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const [presentationState, setPresentationState] = useState<IntroPresentationState>(() => {
    return location.pathname === '/' && !hasPlayedInCurrentSession
      ? 'INTRO_ACTIVE'
      : 'SCROLL_UNLOCKED';
  });

  const isIntroActive = presentationState !== 'HOMEPAGE_ACTIVE' 
    && presentationState !== 'HERO_TEXT_DELAY' 
    && presentationState !== 'HERO_REVEAL' 
    && presentationState !== 'SCROLL_UNLOCKED';

  // Page scrolling remains locked all the way through the intro, match cut, 1.5s hold, and hero text entrance
  const isScrollLocked = presentationState !== 'SCROLL_UNLOCKED';

  const unlockScroll = useCallback(() => {
    hasPlayedInCurrentSession = true;
    setPresentationState('SCROLL_UNLOCKED');
  }, []);

  const skipIntro = useCallback(() => {
    hasPlayedInCurrentSession = true;
    setPresentationState('SCROLL_UNLOCKED');
  }, []);

  // Listen for Escape key to allow discrete skipping
  useEffect(() => {
    if (!isScrollLocked) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        skipIntro();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isScrollLocked, skipIntro]);

  // Robust, complete scroll-locking implementation
  useEffect(() => {
    if (isScrollLocked) {
      document.documentElement.classList.add('intro-scroll-locked');
      document.body.classList.add('intro-scroll-locked');

      const preventScroll = (e: Event) => {
        e.preventDefault();
      };

      const preventKeyScroll = (e: KeyboardEvent) => {
        const scrollKeys = [
          'Space', 'PageUp', 'PageDown', 'End', 'Home',
          'ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'
        ];
        if (scrollKeys.includes(e.code)) {
          e.preventDefault();
        }
      };

      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('touchmove', preventScroll, { passive: false });
      window.addEventListener('keydown', preventKeyScroll, { passive: false });

      return () => {
        document.documentElement.classList.remove('intro-scroll-locked');
        document.body.classList.remove('intro-scroll-locked');
        window.removeEventListener('wheel', preventScroll);
        window.removeEventListener('touchmove', preventScroll);
        window.removeEventListener('keydown', preventKeyScroll);
      };
    } else {
      document.documentElement.classList.remove('intro-scroll-locked');
      document.body.classList.remove('intro-scroll-locked');
    }
  }, [isScrollLocked]);

  return (
    <IntroContext.Provider value={{
      presentationState,
      setPresentationState,
      isIntroActive,
      isScrollLocked,
      skipIntro,
      unlockScroll,
    }}>
      {children}
    </IntroContext.Provider>
  );
};

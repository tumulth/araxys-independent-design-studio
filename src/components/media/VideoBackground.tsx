import React, { useRef, useEffect } from 'react';

export interface VideoBackgroundProps {
  src: string;
  poster?: string;
  className?: string;
  videoClassName?: string;
  opacity?: number;
  loop?: boolean;
  muted?: boolean;
  autoPlay?: boolean;
  playsInline?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  onEnded?: () => void;
  onLoadedData?: () => void;
  children?: React.ReactNode;
}

/**
 * Reusable VideoBackground component.
 * Uses preload="metadata" and a muted autoplay configuration to improve performance.
 */
export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  src,
  poster,
  className = "",
  videoClassName = "object-cover",
  opacity = 1,
  loop = true,
  muted = true,
  autoPlay = true,
  playsInline = true,
  preload = "metadata",
  onEnded,
  onLoadedData,
  children
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Enforce muted on the DOM element directly to satisfy browser autoplay policies
    if (muted) {
      video.muted = true;
    }

    if (autoPlay) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay was prevented by browser policy (e.g. low power mode)
        });
      }
    }
  }, [src, autoPlay, muted]);

  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#03040A] ${className}`}>
      {/* Background Video element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop={loop}
        muted={muted}
        autoPlay={autoPlay}
        playsInline={playsInline}
        preload={preload}
        onEnded={onEnded}
        onLoadedData={onLoadedData}
        className={`absolute inset-0 w-full h-full ${videoClassName}`}
        style={{ opacity }}
      />

      {/* Optional child overlays / scrims / content */}
      {children && (
        <div className="relative z-10 w-full h-full pointer-events-none">
          {children}
        </div>
      )}
    </div>
  );
};

export default VideoBackground;

import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Project } from '../../data/projects';
import { ClientVisualWorld } from '../visuals/ClientVisualWorld';

interface ProjectVideoProps {
  project: Project;
  src?: string;
  className?: string;
}

/**
 * 14 — PROJECT VIDEO COMPONENT
 * Renders dedicated video player for each project case study.
 * Follows client's custom visual world with play/mute controls.
 */
export const ProjectVideo: React.FC<ProjectVideoProps> = ({
  project,
  src,
  className = ""
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasVideoFile, setHasVideoFile] = useState(Boolean(src));

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className={`relative w-full aspect-video rounded-sm overflow-hidden bg-black/90 border border-white/10 ${className}`}>
      {src && hasVideoFile ? (
        <video
          ref={videoRef}
          src={src}
          loop
          playsInline
          muted={isMuted}
          onError={() => setHasVideoFile(false)}
          className="w-full h-full object-cover"
        />
      ) : (
        /* Thematic Client Visual World Video Placeholder */
        <div className="relative w-full h-full">
          <ClientVisualWorld project={project} type="hero" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center font-mono text-xs text-white/80 tracking-widest uppercase">
              PROJECT MOTION REEL // READY FOR MEDIA DROP
            </div>
          </div>
        </div>
      )}

      {/* Control Overlay Bar */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="flex items-center gap-2 px-3 py-1.5 bg-black/70 hover:bg-black text-white text-xs font-mono border border-white/20 transition-colors uppercase tracking-wider backdrop-blur-md"
            aria-label={isPlaying ? "Pause Video" : "Play Video"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#A8FF00]" /> : <Play className="w-3.5 h-3.5 text-[#A8FF00]" />}
            <span>{isPlaying ? 'PAUSE' : 'PLAY MOTION'}</span>
          </button>

          <button
            onClick={toggleMute}
            className="p-1.5 bg-black/70 hover:bg-black text-white text-xs border border-white/20 transition-colors backdrop-blur-md"
            aria-label={isMuted ? "Unmute Video" : "Mute Video"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-[#85889A]" /> : <Volume2 className="w-3.5 h-3.5 text-[#A8FF00]" />}
          </button>
        </div>

        <div className="font-mono text-[10px] text-white/60 tracking-widest uppercase hidden sm:block">
          {project.name} // MOTION SYSTEM
        </div>
      </div>
    </div>
  );
};

export default ProjectVideo;

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../data/projects';
import { ClientVisualWorld } from './visuals/ClientVisualWorld';

interface ProjectRowProps {
  project: Project;
  index: number;
  onHoverStart?: (project: Project, e: React.MouseEvent) => void;
  onHoverEnd?: () => void;
  onMouseMove?: (e: React.MouseEvent) => void;
}

/**
 * 13 — PROJECT ROW COMPONENT
 * Clean, editorial, unboxed metadata, and high-precision hover effects.
 */
export const ProjectRow: React.FC<ProjectRowProps> = ({ 
  project,
  onHoverStart,
  onHoverEnd,
  onMouseMove
}) => {
  return (
    <Link
      to={`/work/${project.slug}`}
      onMouseEnter={(e) => onHoverStart?.(project, e)}
      onMouseLeave={() => onHoverEnd?.()}
      onMouseMove={(e) => onMouseMove?.(e)}
      className="group block w-full border-b border-white/[0.08] py-8 sm:py-10 transition-colors duration-300 hover:bg-[#070A24]/40"
      aria-label={`View project ${project.name}`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-transform duration-300 group-hover:translate-x-1.5">
        {/* Left: Number + Title */}
        <div className="flex items-start sm:items-center gap-6 sm:gap-10">
          <span className="font-mono text-xs sm:text-sm text-[#85889A] group-hover:text-[#A8FF00] transition-colors tabular-nums pt-1 sm:pt-0">
            {project.number}
          </span>
          <div>
            <h3 className="font-grotesk text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.04em] leading-[0.9] text-[#F2F2ED] uppercase transition-colors group-hover:text-white">
              {project.name}
            </h3>
            <div className="flex items-center gap-2 mt-2 text-xs font-mono text-[#85889A] lg:hidden">
              <span>{project.category}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{project.year}</span>
            </div>
          </div>
        </div>

        {/* Center: Metadata & Category (Desktop) */}
        <div className="hidden lg:flex flex-col items-start font-mono text-xs text-[#85889A] uppercase tracking-wider">
          <span className="text-[#F2F2ED]/90">{project.category}</span>
          <span className="text-[#85889A]/70 text-[10px] mt-0.5 tabular-nums">EST. {project.year}</span>
        </div>

        {/* Right: Visual Preview Area + Arrow */}
        <div className="flex items-center justify-between lg:justify-end gap-6 sm:gap-8">
          {/* Static Thumbnail on row */}
          <div className="relative w-28 sm:w-36 h-16 sm:h-20 rounded-sm overflow-hidden bg-[#070A24] border border-white/10 group-hover:border-[#1018FF]/50 shrink-0 shadow-lg transition-colors">
            <div className="w-full h-full transition-transform duration-500 group-hover:scale-105">
              <ClientVisualWorld project={project} type="thumbnail" />
            </div>
            <div className="absolute inset-0 border border-transparent group-hover:border-[#A8FF00]/30 transition-colors pointer-events-none" />
          </div>

          {/* Interactive Arrow */}
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#A8FF00] group-hover:bg-[#A8FF00] transition-all duration-300 shrink-0">
            <ArrowUpRight className="w-4 h-4 text-[#F2F2ED] group-hover:text-[#03040A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectRow;

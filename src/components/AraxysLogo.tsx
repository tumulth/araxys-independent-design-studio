import React from 'react';

interface AraxysLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'mark-only';
}

/**
 * Geometric ARAXYS Brand Mark
 * Composed of the electric blue (#1018FF) and acid lime (#A8FF00) dynamic chevrons
 */
export const AraxysMark: React.FC<{ className?: string; size?: number | string }> = ({
  className = "w-8 h-8",
  size
}) => {
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      aria-label="ARAXYS Mark"
    >
      {/* Left Electric Blue diagonal facet */}
      <path
        d="M0 160L78 0H112L34 160H0Z"
        fill="#1018FF"
      />
      {/* Central Acid Lime diagonal facet */}
      <path
        d="M36 160L114 0H148L70 160H36Z"
        fill="#A8FF00"
      />
      {/* Right Vertical Electric Blue bar */}
      <path
        d="M106 50H136V160H106V50Z"
        fill="#1018FF"
      />
    </svg>
  );
};

export const AraxysLogo: React.FC<AraxysLogoProps> = ({
  className = "h-7",
  showText = true,
  variant = 'full'
}) => {
  if (variant === 'mark-only' || !showText) {
    return <AraxysMark className={className} />;
  }

  return (
    <img 
      src="/assets/araxys-logo.png" 
      alt="ARAXYS" 
      className={`${className} w-auto object-contain block select-none`} 
    />
  );
};

export default AraxysLogo;

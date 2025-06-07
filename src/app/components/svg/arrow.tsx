import React from 'react';

interface ArrowIconProps {
  className?: string;
  color?: string;
  hoverColor?: string;
  size?: number;
}

const ArrowIcon: React.FC<ArrowIconProps> = ({ 
  className = '', 
  color = '#9ba6b3',
  hoverColor = '7c9ebf',
  size = 12 
}) => {
  return (
    <svg 
      viewBox="0 0 12 10" 
      width={size} 
      height={size * (10/12)} // Maintain aspect ratio
      className={`transition-all duration-200 group-hover:translate-x-1 ${className}`}
    >
      <path 
        d="M 2 8.5 L 10.424 0.703" 
        fill="transparent" 
        strokeWidth="1.3" 
        className={`transition-[stroke] duration-200 group-hover:stroke-foreground`}
        stroke={color}
      />
      <path 
        d="M 10.32 5.769 L 10.32 0.769 L 5.32 0.769" 
        fill="transparent" 
        strokeWidth="1.3" 
        className={`transition-[stroke] duration-200 group-hover:stroke-foreground`}
        stroke={color}
      />
    </svg>
  );
};

export default ArrowIcon;
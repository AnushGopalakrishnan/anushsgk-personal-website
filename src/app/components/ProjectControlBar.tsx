import React from 'react';
import { useLayout } from './contexts/LayoutContext';
import Arrow from './svg/arrow';

type LayoutType = 'featured' | 'grid';

interface ProjectControlBarProps {
  title: string;
  client?: string;
  tags?: string[];
  projectUrl?: string;
  onLayoutControlBarClick?: () => void;
}

const getIcon = (type: LayoutType, active: boolean) => {
  const opacity = active ? 1 : 0.7;
  switch (type) {
    case 'grid':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24">
          {[0, 8, 16].map((y) =>
            [0, 8, 16].map((x) => (
              <rect key={`${x}-${y}`} x={x} y={y} width="6" height="6" fill="currentColor" opacity={opacity} />
            ))
          )}
        </svg>
      );
      case 'featured':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24">
      {/* Large block (2x2) */}
      <rect x="0" y="0" width="15" height="15" rx="1" fill="currentColor" opacity={opacity} />
      
      {/* Top-right small block */}
      <rect x="16" y="0" width="7" height="7" rx="1" fill="currentColor" opacity={opacity} />
      
      {/* Middle-right small block */}
      <rect x="16" y="8" width="7" height="7" rx="1" fill="currentColor" opacity={opacity} />
      
      {/* Bottom row - three blocks with 1px gutters */}
      <rect x="0" y="16" width="7" height="7" rx="1" fill="currentColor" opacity={opacity} />
      <rect x="8" y="16" width="7" height="7" rx="1" fill="currentColor" opacity={opacity} />
      <rect x="16" y="16" width="7" height="7" rx="1" fill="currentColor" opacity={opacity} />
    </svg>
        );
  }
};

const ProjectControlBar: React.FC<ProjectControlBarProps> = ({ title, client, tags, projectUrl, onLayoutControlBarClick }) => {
  const { layout, setLayout } = useLayout();
  // Swap the order so 'featured' comes first
  const layoutTypes: LayoutType[] = ['featured', 'grid'];
  console.log(tags); 
  return (
    <div className="sticky top-0 z-20 bg-background flex items-center justify-between px-2 py-2" style={{ minHeight: 56 }}>
      {/* Title and client on the left */}
      <div className="font-graphik text-sm font-medium text-foreground flex-1 text-left opacity-80 flex items-center pl-2">
        {projectUrl ? (
          <a 
            href={projectUrl}
            className="group flex items-center gap-2"
          >
            {client ? (
              <span>{title} <span>for</span> {client}</span>
            ) : (
              <span>{title}</span>
            )}
            <Arrow hoverColor="var(--bg-foreground)" />
          </a>
        ) : (
          <div className="flex items-center gap-2">
            {client ? (
              <span>{title} <span>for</span> {client}</span>
            ) : (
              <span>{title}</span>
            )}
          </div>
        )}
      </div>

      {/* Layout controls centered - hidden on mobile */}
      <div className="hidden md:flex gap-2 flex-1 justify-center">
        {layoutTypes.map((layoutType) => (
          <button
            key={layoutType}
            onClick={() => {
              if (onLayoutControlBarClick) onLayoutControlBarClick();
              setLayout(layoutType);
            }}
            className={`w-9 h-9 flex items-center justify-center rounded transition-colors border-none outline-none cursor-pointer ${
              layout === layoutType ? 'text-foreground' : 'text-foreground/60 hover:bg-foreground/10'
            }`}
            aria-label={layoutType}
          >
            {getIcon(layoutType, layout === layoutType)}
          </button>
        ))}
      </div>

      {/* Tags on the right */}
      <div className="flex-1 flex justify-end">
        {tags && tags.length > 0 ? (
          tags.map((tag, index) => (
            <span 
              key={index}
              className="text-xs text-foreground dark:text-foreground border border-foreground/20 font-mono bg-background dark:bg-background dark:border dark:border-solid dark:border-foreground/20 px-2 py-1 rounded mr-2"
            >
              {tag.toUpperCase()}
            </span>
          ))
        ) : (
          <span className="text-xs text-foreground/40 font-mono">No tags</span>
        )}
      </div>
    </div>
  );
};

export default ProjectControlBar;
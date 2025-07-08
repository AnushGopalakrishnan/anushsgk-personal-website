import React from 'react';
import { useLayout } from './contexts/LayoutContext';
import Arrow from './svg/arrow';

type LayoutType = 'featured' | 'grid' | 'feed';

interface ProjectControlBarProps {
  title: string;
  client?: string;
  tags?: string[];
  projectUrl?: string;
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
    case 'feed':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24">
          {[0, 8, 16].map((y, i) => (
            <rect key={i} x="0" y={y} width="24" height="6" fill="currentColor" opacity={opacity} />
          ))}
        </svg>
      );
  }
};

const ProjectControlBar: React.FC<ProjectControlBarProps> = ({ title, client, tags, projectUrl }) => {
  const { layout, setLayout } = useLayout();
  const layoutTypes: LayoutType[] = ['grid', 'featured', 'feed'];

  return (
    <div className="sticky top-0 z-20 bg-background flex items-center justify-between px-2 py-2" style={{ minHeight: 56 }}>
      {/* Title and client on the left */}
      <div className="font-graphik text-sm font-medium text-foreground flex-1 text-left opacity-80 flex items-center gap-2 pl-2">
        {client ? (
          <span>{title} <span>for</span> {client}</span>
        ) : (
          <span>{title}</span>
        )}
        <a 
          href={projectUrl}
          className="group"
        >
          <Arrow hoverColor="var(--bg-foreground)" />
        </a>
      </div>

      {/* Layout controls centered - hidden on mobile */}
      <div className="hidden md:flex gap-2 flex-1 justify-center">
        {layoutTypes.map((layoutType) => (
          <button
            key={layoutType}
            onClick={() => setLayout(layoutType)}
            className={`w-9 h-9 flex items-center justify-center rounded transition-colors border-none outline-none ${
              layout === layoutType ? 'text-foreground' : 'text-foreground/60 hover:bg-foreground/10'
            }`}
            aria-label={layoutType}
          >
            {getIcon(layoutType, layout === layoutType)}
          </button>
        ))}
      </div>

      {/* Tags on the right */}
      <div className="flex-1 flex justify-end gap-2">
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

import { useState } from 'react';

// ProjectControlBar component
function ProjectControlBar({ title, layout, setLayout }: { title: string, layout: string, setLayout: (l: string) => void }) {
  return (
    <div className="sticky top-0 z-20 bg-background/80 backdrop-blur flex items-center justify-between px-6 py-4 border-b border-border">
      {/* Title on the left */}
      <div className="font-suisse text-xl font-bold text-foreground flex-1 text-left">
        {title}
      </div>
      {/* Layout controls centered */}
      <div className="flex gap-2 flex-1 justify-center">
        {['featured', 'grid', 'feed'].map((layoutType) => (
          <button
            key={layoutType}
            onClick={() => setLayout(layoutType)}
            className={`px-3 py-1 rounded-md font-suisse text-base transition-colors ${layout === layoutType ? 'bg-primary text-background' : 'bg-background text-foreground hover:bg-foreground/10'}`}
          >
            {layoutType === 'featured' ? '1' : layoutType === 'grid' ? '2' : '3'}
          </button>
        ))}
      </div>
      {/* Tags placeholder on the right */}
      <div className="flex-1 flex justify-end">
        <div className="bg-border/40 rounded px-3 py-1 text-foreground/60 text-sm font-suisse">Tags Placeholder</div>
      </div>
    </div>
  );
}

'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type LayoutType = 'featured' | 'grid' | 'feed';

interface LayoutContextType {
  layout: LayoutType;
  setLayout: (layout: LayoutType) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

interface LayoutProviderProps {
  children: ReactNode;
}

export function LayoutProvider({ children }: LayoutProviderProps) {
  const [layout, setLayout] = useState<LayoutType>('featured');
  const [hydrated, setHydrated] = useState(false);  

  useEffect(() => {
    const savedLayout = localStorage.getItem('project-layout');
    if (savedLayout && ['featured', 'grid', 'feed'].includes(savedLayout)) {
      setLayout(savedLayout as LayoutType);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('project-layout', layout);
  }, [layout]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && layout !== 'feed') {
        setLayout('feed');
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [layout]);

  const value = {
    layout,
    setLayout,
  };

  return (
    <LayoutContext.Provider value={value}>
      {hydrated ? children : null}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
}
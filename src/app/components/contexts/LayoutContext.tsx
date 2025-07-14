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

  // Load layout from localStorage on mount
  useEffect(() => {
    const savedLayout = localStorage.getItem('project-layout');
    if (savedLayout && ['featured', 'grid', 'feed'].includes(savedLayout)) {
      setLayout(savedLayout as LayoutType);
    }
  }, []);

  // Save layout to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('project-layout', layout);
  }, [layout]);

  // Force feed layout on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && layout !== 'feed') {
        setLayout('feed');
      }
    };

    // Check on mount
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [layout]);

  const value = {
    layout,
    setLayout,
  };

  return (
    <LayoutContext.Provider value={value}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
} 
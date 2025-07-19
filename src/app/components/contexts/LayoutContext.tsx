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
    const isMobile = window.innerWidth < 768;
    
    if (savedLayout && ['featured', 'grid', 'feed'].includes(savedLayout)) {
      // If we have a saved layout, use it but respect mobile/desktop constraints
      if (isMobile && savedLayout !== 'feed') {
        setLayout('feed');
      } else if (!isMobile && savedLayout === 'feed') {
        setLayout('featured');
      } else {
        setLayout(savedLayout as LayoutType);
      }
    } else {
      // If no saved layout or invalid value, set default based on screen size
      const defaultLayout = isMobile ? 'feed' : 'featured';
      setLayout(defaultLayout);
      localStorage.setItem('project-layout', defaultLayout);
    }
    setHydrated(true);
  }, []);

  // Prevent layout changes during initial hydration to avoid flicker
  const [initialHydrationComplete, setInitialHydrationComplete] = useState(false);
  
  useEffect(() => {
    if (hydrated) {
      // Small delay to ensure all components have rendered with the initial layout
      const timer = setTimeout(() => {
        setInitialHydrationComplete(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [hydrated]);

  useEffect(() => {
    localStorage.setItem('project-layout', layout);
  }, [layout]);

  useEffect(() => {
    const handleResize = () => {
      if (initialHydrationComplete) {
        if (window.innerWidth < 768 && layout !== 'feed') {
          setLayout('feed');
        } else if (window.innerWidth >= 768 && layout === 'feed') {
          // When switching back to desktop, default to 'featured' if we were on 'feed'
          setLayout('featured');
        }
      }
    };
    if (initialHydrationComplete) {
      handleResize();
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [layout, initialHydrationComplete]);

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
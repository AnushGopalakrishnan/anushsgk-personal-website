# Components Structure

This directory contains all the React components for the Anush website, organized for better maintainability and readability.

## Directory Structure

```
components/
├── hooks/                    # Custom React hooks
│   ├── useColumnCount.ts     # Responsive column calculation
│   ├── useViewportDimensions.ts # Viewport size tracking
│   ├── useScrollAnimations.ts   # Scroll-based animations
│   └── index.ts              # Hook exports
├── ui/                       # Reusable UI components
│   ├── HeroSection.tsx       # Main hero section
│   ├── BackgroundText.tsx    # Animated background text
│   ├── ProjectGallery.tsx    # Project gallery with controls
│   ├── ComingSoonPlaceholder.tsx # Placeholder component
│   ├── LazyVideo.tsx         # Lazy loading video component
│   ├── ProjectCard.tsx       # Individual project card
│   └── index.ts              # Component exports
├── utils/                    # Utility functions
│   └── layoutUtils.ts        # Layout calculation utilities
├── svg/                      # SVG components
├── ProjectControlBar.tsx     # Project layout controls
├── HomeContent.tsx           # Main content component
└── README.md                 # This file
```

## Key Improvements

### 1. **Separation of Concerns**
- **Hooks**: Custom logic separated into reusable hooks
- **UI Components**: Pure presentation components
- **Utils**: Helper functions for calculations

### 2. **Custom Hooks**
- `useColumnCount`: Handles responsive column calculation
- `useViewportDimensions`: Tracks viewport size changes
- `useScrollAnimations`: Manages scroll-based animations

### 3. **UI Components**
- `HeroSection`: Self-contained hero section
- `BackgroundText`: Animated background text
- `ProjectGallery`: Complete project gallery with controls
- `ComingSoonPlaceholder`: Reusable placeholder
- `LazyVideo`: Optimized video loading
- `ProjectCard`: Individual project display

### 4. **Clean Imports**
- Index files provide clean import paths
- Organized exports for better developer experience

## Usage

```tsx
import { 
    HeroSection, 
    BackgroundText, 
    ProjectGallery 
} from './ui';
import { useScrollAnimations } from './hooks';
```

## Benefits

1. **Maintainability**: Each component has a single responsibility
2. **Reusability**: Components can be easily reused across the app
3. **Testability**: Smaller components are easier to test
4. **Readability**: Clear separation makes code easier to understand
5. **Performance**: Better code splitting and lazy loading opportunities 
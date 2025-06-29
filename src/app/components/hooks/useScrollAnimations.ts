import { useRef, useState, useEffect } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { useViewportDimensions } from './useViewportDimensions';

export function useScrollAnimations() {
    const { scrollYProgress } = useScroll();
    const textRef = useRef<HTMLParagraphElement>(null);
    const [textHeight, setTextHeight] = useState(0);
    const [fontSize, setFontSize] = useState(0);
    const { width: viewportWidth, height: viewportHeight } = useViewportDimensions();

    // Calculate dynamic font size and text height
    useEffect(() => {
        if (!viewportWidth) return;
        
        const scaleFactor = 0.08;
        const calculatedFontSize = Math.min(viewportWidth * scaleFactor, 180);
        setFontSize(calculatedFontSize);
        
        if (textRef.current) {
            setTextHeight(textRef.current.offsetHeight);
        }
    }, [viewportWidth]);

    // Transform calculations
    const yPos = useTransform(
        scrollYProgress,
        [0, 1],
        [0, -(Math.min(viewportHeight * 0.2, viewportHeight - (textHeight + 64)))]
    );

    const rotateX = useTransform(scrollYProgress, [0, 1], [-15, 0]);
    const zoom = useTransform(scrollYProgress, [0, 1], [0.95, 1.0]);

    return {
        textRef,
        fontSize,
        yPos,
        rotateX,
        zoom
    };
} 
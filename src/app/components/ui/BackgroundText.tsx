import React from 'react';
import { motion } from 'framer-motion';

interface BackgroundTextProps {
    textRef: React.RefObject<HTMLParagraphElement | null>;
    fontSize: number;
    rotateX: any;
    zoom: any;
}

export function BackgroundText({ textRef, fontSize, rotateX, zoom }: BackgroundTextProps) {
    return (
        <motion.div 
            className="fixed bottom-0 left-0 w-screen py-8 pb-1 text-center text-foreground/70 z-0"
            style={{
                rotateX,
                zoom,
                perspective: "1000px",
                transformOrigin: "bottom"
            }}
        >
            <p 
                ref={textRef}
                className="text-primary graphik-text font-bold tracking-[-0.06em] whitespace-nowrap"
                style={{
                    fontSize: `${fontSize}px`,
                    lineHeight: '1em'
                }}
            >
                AnushGopalakrishnan©{new Date().getFullYear()}.
            </p>
        </motion.div>
    );
} 
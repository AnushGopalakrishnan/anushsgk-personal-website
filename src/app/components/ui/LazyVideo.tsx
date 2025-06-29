import React, { useRef, useEffect } from 'react';

interface LazyVideoProps {
    src: string;
    poster?: string;
}

export function LazyVideo({ src, poster }: LazyVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        const container = containerRef.current;
        
        if (!video || !container) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        video.src = src;
                        video.load();
                        observer.unobserve(container);
                    }
                });
            },
            {
                rootMargin: '50px 0px',
                threshold: 0
            }
        );

        observer.observe(container);
        return () => observer.unobserve(container);
    }, [src]);

    return (
        <div ref={containerRef} className="w-full h-full">
            <video 
                ref={videoRef}
                poster={poster}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
            />
        </div>
    );
} 
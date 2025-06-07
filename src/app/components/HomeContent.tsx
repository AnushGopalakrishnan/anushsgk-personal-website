'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import BearSVG from './svg/bear';
import type { Profile, Project } from '@/types/sanity';
import Arrow from './svg/arrow';

interface HomeContentProps {
    profile: Profile;
    projects: Project[];
}

// Custom hook for responsive column calculation
function useColumnCount() {
    const [columns, setColumns] = useState(1);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const updateColumns = () => {
            const width = window.innerWidth;
            if (width >= 1800) setColumns(3);
            else if (width >= 768) setColumns(2);
            else setColumns(1);
            console.log(width);
        };

        updateColumns();
        window.addEventListener('resize', updateColumns);
        return () => window.removeEventListener('resize', updateColumns);
    }, []);

    return columns;
}

// Custom hook for viewport dimensions
function useViewportDimensions() {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const updateDimensions = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    return dimensions;
}

// Lazy loading video component
function LazyVideo({ src, poster }: { src: string; poster?: string }) {
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

// Project card component
function ProjectCard({ project, index }: { project: Project; index: number }) {
    return (
        <motion.div 
            key={project._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="group bg-card-background rounded-[8px] overflow-hidden border border-card-border h-[352px] md:h-[600px] xl:h-[780px]"
        >
            <a href={`/project/${project.slug}`} className="flex flex-col h-full">
                {/* Main content area - takes up most of the space */}
                <div className="flex-1 p-6 md:p-8 xl:p-10 flex items-center justify-center">
                    <div className="relative w-full max-w-[90%] aspect-[16/10] rounded-md overflow-hidden transition-all duration-300 glow-hover">
                        {project.video ? (
                            <LazyVideo 
                                src={project.video}
                                poster={project.heroImage}
                            />
                        ) : project.heroImage && (
                            <Image 
                                src={project.heroImage}
                                alt={project.title}
                                className="object-cover transition-all duration-700 ease-out"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority={index < 2}
                                quality={90}
                            />
                        )}
                    </div>
                </div>
                
                {/* Bottom section with project info */}
                <div className="px-6 md:px-8 xl:px-10 pb-6 md:pb-6 xl:pb-10">
                    <div className="flex justify-between items-end">
                        <div className='flex items-center gap-2 group'>
                            <h2 className="text-card-text-primary suisse-text text-sm md:text-xs xl:text-lg font-medium leading-tight tracking-tight">
                                {project.title}
                            </h2>
                            <Arrow hoverColor="var(--bg-foreground)" />
                        </div>
                        <div>
                            <span className="text-card-text-primary text-xs md:text-xs xl:text-base font-normal leading-tight tracking-tight">
                                Web Design + Development
                            </span>
                        </div>
                    </div>
                </div>
            </a>
        </motion.div>
    );
}
// Coming soon placeholder component
function ComingSoonPlaceholder({ columnSpan }: { columnSpan: string }) {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`group bg-card-background rounded-[8px] overflow-hidden p-8 h-[400px] md:h-[600px] xl:h-[780px] border border-card-border ${columnSpan} flex items-center justify-center`}
        >
            <div className="text-center">
                <h3 className="font-suisse text-xl font-medium text-card-text-primary/60">
                    Coming Soon
                </h3>
                <p className="text-sm text-card-text-secondary/60 mt-2">
                    More projects in the works
                </p>
            </div>
        </motion.div>
    );
}

function HomeContent({ profile, projects }: HomeContentProps) {
    const { scrollYProgress } = useScroll();
    const textRef = useRef<HTMLParagraphElement>(null);
    const [textHeight, setTextHeight] = useState(0);
    const [fontSize, setFontSize] = useState(0);
    const columnCount = useColumnCount();
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

    // Transform calculations - reduced scroll distance to keep more footer text visible
    const yPos = useTransform(
        scrollYProgress,
        [0, 1],
        [0, -(Math.min(viewportHeight * 0.2, viewportHeight - (textHeight + 64)))]
    );

    const rotateX = useTransform(scrollYProgress, [0, 1], [-15, 0]);
    const zoom = useTransform(scrollYProgress, [0, 1], [0.95, 1.0]);

    // Render placeholder logic
    const renderPlaceholders = () => {
        if (!projects.length) return null;

        const itemsInLastRow = projects.length % columnCount;
        const isLastRowComplete = itemsInLastRow === 0;
        
        if (isLastRowComplete && projects.length >= columnCount) {
            const columnSpan = columnCount === 2 ? 'md:col-span-2' : 
                             columnCount === 3 ? 'xl:col-span-3' : '';
            return <ComingSoonPlaceholder columnSpan={columnSpan} />;
        }

        if (!isLastRowComplete) {
            const remainingColumns = columnCount - itemsInLastRow;
            const columnSpan = remainingColumns === 2 ? 'md:col-span-2' : 
                             remainingColumns === 3 ? 'xl:col-span-3' : '';
            return <ComingSoonPlaceholder columnSpan={columnSpan} />;
        }

        return null;
    };

    return (
        <div className="relative md:min-h-[185vh] xl:min-h-[150vh] overflow-hidden">
            {/* Fixed background text */}
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

            {/* Sliding sheet */}
            <motion.main 
                className="flex flex-col items-center w-full bg-background min-h-screen shadow-md relative z-10"
                style={{
                    y: yPos,
                    boxShadow: "0 0.602187px 0.602187px -1.25px #55667712, 0 2.28853px 2.28853px -2.5px #55667710, 0 10px 10px -3.75px #55667706"
                }}
            >
                {/* Hero Section */}
                <div className="flex flex-col items-start md:items-center justify-center min-h-[80vh] gap-3 px-4 md:px-0">
                    <div className="text-foreground transition-colors self-start md:self-center">
                        <BearSVG />
                    </div>
                    <h1 className="text-[14px] xl:text-[20px] text-foreground font-suisse w-full md:w-[37vw] text-left md:text-center">
                        Anush Gopalakrishnan is a web designer and no-code web developer based in Bangalore, India. 
                        His work is focused on the meticulous crafting of distinctive and impactful web experiences.
                    </h1>
                    <div className="flex gap-4 mt-6 items-center border border-card-border hover:border-foreground rounded-lg px-[8px] py-[2px] transition-colors self-start md:self-center">
                        <a 
                            href="mailto:hello@anushgopalakrishnan.com"
                            className="flex items-center gap-1 text-foreground hover:text-primary transition-colors"
                        >
                            <div className="relative">
                                <div className="w-4 h-4 bg-foreground/20 rounded-full"></div>
                                <div className="absolute top-0.75 left-0.75 w-2.5 h-2.5 bg-foreground rounded-full animate-[pulse_2s_cubic-bezier(0.25,1.01,0.69,0.42)_infinite]"></div>
                            </div>
                            <span className="font-suisse text-md text-foreground">Available For Hire</span>
                        </a>
                    </div>
                </div>

                {/* Projects Showcase Section */}
                <section className="w-full px-4 py-16">
                    <div 
                        className="grid gap-[16px]"
                        style={{ 
                            gridTemplateColumns: `repeat(${columnCount}, 1fr)`
                        }}
                    >
                        {projects.map((project, index) => (
                            <ProjectCard 
                                key={project._id} 
                                project={project} 
                                index={index} 
                            />
                        ))}
                        {renderPlaceholders()}
                    </div>
                </section>
            </motion.main>
        </div>
    );
}

export default HomeContent;
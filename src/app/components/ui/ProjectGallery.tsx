import React from 'react';
import { motion } from 'framer-motion';
import type { Project } from '@/types/sanity';
import ProjectControlBar from '../ProjectControlBar';
import { useLayout } from '../contexts/LayoutContext';
import { urlForWebp } from '@/sanity/lib/image';
import Image from 'next/image';
import { getSanityImageSrcSet, defaultSanityImageSizes } from '@/sanity/lib/image';

type LayoutType = 'featured' | 'grid' | 'feed';

interface ProjectGalleryProps {
    project: Project;
    onLayoutControlBarClick?: () => void;
    onImageClick?: (imageIndex: number) => void;
}

// Helper for grid class
const getGridClassName = (layout: LayoutType) => {
    switch (layout) {
        case 'featured':
            return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4";
        case 'grid':
            return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4";
        case 'feed':
            return "grid grid-cols-1 gap-4";
        default:
            return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4";
    }
};

export function ProjectGallery({ project, onLayoutControlBarClick, onImageClick }: ProjectGalleryProps) {
    const { layout } = useLayout();

    
    // Ensure hero image is first in the gallery
    const galleryImages = [
        ...(project.heroImage ? [project.heroImage] : []),
        ...((project.galleryImages || []).filter((img) => img !== project.heroImage))
    ];

    return (
        <section className="w-full mb-4 bg-background">
            <div className="w-full mb-4">
                <ProjectControlBar
                    title={project.title}
                    client={project.client}
                    tags={project.tags}
                    projectUrl={project.projectUrl}
                    onLayoutControlBarClick={onLayoutControlBarClick}
                />
            </div>
            <div className="pt-16 pb-24 px-3 md:px-3 xl:px-3 bg-background w-full">
                {/* Gallery grid */}
                <motion.div 
                    layout 
                    transition={{
                        default: { ease: "linear" },
                        layout: { duration: 0.3 }
                    }} 
                    className={getGridClassName(layout)}
                >
                    {galleryImages.map((imageUrl, index) => {
                        const isFeatured = layout === 'featured' && index === 0;
                        const featuredClass = isFeatured ? 'md:col-span-2 md:row-span-2' : '';
                        return (
                            <motion.div
                                key={`${project._id}-${index}`}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ 
                                    layout: { duration: 0.2, type: 'easeout' }, 
                                    duration: 0.5, 
                                    delay: index * 0.1 
                                }}
                                className={`aspect-[16/9] relative border-img-border border solid overflow-hidden ${featuredClass} ${!isFeatured ? 'flex items-center justify-center' : ''}`}
                                onClick={() => onImageClick?.(index)}
                                style={{ cursor: 'pointer' }}
                            >
                                <img
                                    src={urlForWebp(imageUrl).url()}
                                    srcSet={getSanityImageSrcSet(imageUrl)}
                                    sizes={defaultSanityImageSizes}
                                    alt={`${project.title} gallery image ${index + 1}`}
                                    className="w-full h-full object-contain"
                                    loading="lazy"
                                />
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Project } from '@/types/sanity';
import ProjectControlBar from '../ProjectControlBar';
import { useLayout } from '../contexts/LayoutContext';
import Lightbox from 'yet-another-react-lightbox';
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";

type LayoutType = 'featured' | 'grid' | 'feed';

interface ProjectGalleryProps {
    project: Project;
    onLayoutControlBarClick?: () => void;
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

export function ProjectGallery({ project, onLayoutControlBarClick }: ProjectGalleryProps) {
    const { layout } = useLayout();

    
    // Ensure hero image is first in the gallery
    const galleryImages = [
        ...(project.heroImage ? [project.heroImage] : []),
        ...((project.galleryImages || []).filter((img) => img !== project.heroImage))
    ];

    // Lightbox state
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    return (
        <section className="w-full mt-20 mb-4 bg-background" style={{ minHeight: '120vh' }}>
            {/* Add custom CSS for top captions */}
            <style jsx>{`
                .custom-lightbox-title-toolbar {
                    position: fixed !important;
                    top: 0 !important;
                    left: 0 !important;
                    right: 0 !important;
                    width: 100vw !important;
                    background: rgba(0,0,0,0.5) !important;
                    padding: 16px 24px !important;
                    font-size: 18px !important;
                    font-weight: 600 !important;
                    color: white !important;
                    pointer-events: none !important;
                    backdrop-filter: blur(8px) !important;
                    text-align: center !important;
                    z-index: 1000 !important;
                }
                
                .yarl__slide_title {
                    display: none !important;
                }
            `}</style>
            
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
                                key={index}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ 
                                    layout: { duration: 0.2, type: 'easeout' }, 
                                    duration: 0.5, 
                                    delay: index * 0.1 
                                }}
                                className={`aspect-[16/9] relative border-img-border border solid overflow-hidden ${featuredClass} ${!isFeatured ? 'flex items-center justify-center' : ''}`}
                                onClick={() => { setLightboxOpen(true); setPhotoIndex(index); }}
                                style={{ cursor: 'pointer' }}
                            >
                                <img
                                    src={imageUrl}
                                    alt={`${project.title} gallery image ${index + 1}`}
                                    className="w-full h-full object-contain"
                                />
                            </motion.div>
                        );
                    })}
                </motion.div>
                {/* Lightbox */}
                <Lightbox
                    open={lightboxOpen}
                    plugins={[Captions]}
                    close={() => setLightboxOpen(false)}
                    slides={galleryImages.map((src) => ({ src }))}
                    index={photoIndex}
                    on={{ view: ({ index }) => setPhotoIndex(index) }}
                    render={{
                        buttonClose: () => (
                            <>
                                <div className="custom-lightbox-title-toolbar">
                                    {project.title}
                                </div>
                                <button
                                    type="button"
                                    className="yarl__button"
                                    onClick={() => setLightboxOpen(false)}
                                    style={{ 
                                        position: 'absolute',
                                        top: '16px',
                                        right: '16px',
                                        zIndex: 1001,
                                        
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '40px',
                                        height: '40px',
                                        color: 'white',
                                        fontSize: '18px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    ×
                                </button>
                            </>
                        )
                    }}
                />
            </div>
        </section>
    );
}
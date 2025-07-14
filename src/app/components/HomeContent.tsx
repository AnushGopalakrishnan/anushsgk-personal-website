'use client';

import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import type { Profile, Project } from '@/types/sanity';
import { useScrollAnimations } from './hooks/useScrollAnimations';
import { usePlaceholderLogic } from './utils/layoutUtils';
import { HeroSection } from './ui';
import { ProjectGallery } from './ui/ProjectGallery';
import NewsletterSignup from './ui/NewsletterSignup';
import Lightbox from 'yet-another-react-lightbox';
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import { LeftArrowIcon } from './svg/left-arrow';
import { RightArrowIcon } from './svg/right-arrow';
import { CloseButton } from './svg/close-button';

type LayoutType = 'featured' | 'grid' | 'feed';

interface HomeContentProps {
    profile: Profile;
    projects: Project[];
}

// Helper type for unified gallery items
interface GalleryItem {
    src: string;
    projectId: string;
    projectTitle: string;
    imageIndex: number;
}

function HomeContent({ profile, projects }: HomeContentProps) {
    const { textRef, fontSize, yPos, rotateX, zoom } = useScrollAnimations();
    const { getPlaceholderColumnSpan, shouldShowPlaceholder } = usePlaceholderLogic();
    // --- New logic for scroll-to-active-project ---
    const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
    const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
    // Get layout from context (shared)
    const { layout } = require('./contexts/LayoutContext').useLayout();

    // Lightbox state moved to parent
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    // Create unified gallery from all projects
    const unifiedGallery: GalleryItem[] = projects.flatMap((project) => {
        const galleryImages = [
            ...(project.heroImage ? [project.heroImage] : []),
            ...((project.galleryImages || []).filter((img) => img !== project.heroImage))
        ];
        
        return galleryImages.map((imageUrl, index) => ({
            src: imageUrl,
            projectId: project._id,
            projectTitle: project.title,
            imageIndex: index
        }));
    });

    useEffect(() => {
        if (activeProjectId && sectionRefs.current[activeProjectId]) {
            sectionRefs.current[activeProjectId]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [layout]);

    // Function to open lightbox from a specific project and image
    const openLightboxFromProject = (projectId: string, imageIndex: number) => {
        const globalIndex = unifiedGallery.findIndex(
            item => item.projectId === projectId && item.imageIndex === imageIndex
        );
        if (globalIndex !== -1) {
            setPhotoIndex(globalIndex);
            setLightboxOpen(true);
        }
    };

    // Get current project info for lightbox title
    const getCurrentProjectInfo = () => {
        if (photoIndex >= 0 && photoIndex < unifiedGallery.length) {
            return unifiedGallery[photoIndex];
        }
        return null;
    };

    const currentProject = getCurrentProjectInfo();

    return (
        <div className="relative md:min-h-[185vh] xl:min-h-[150vh]">
            {/* Add custom CSS for top captions */}
            <style jsx>{`
                .custom-lightbox-title-toolbar {
                    position: fixed !important;
                    top: 0 !important;
                    left: 0 !important; 
                    right: 0 !important;
                    width: 100vw !important;
                    background: color-mix(in srgb, var(--background) 70%, transparent) !important;
                    padding: 16px 24px !important;
                    font-size: 18px !important;
                    font-weight: 600 !important;
                    font-family: 'Suisse-Intl-Regular', Arial, Helvetica, sans-serif !important;
                    color: var(--foreground) !important;
                    pointer-events: none !important;
                    backdrop-filter: blur(8px) !important;
                    text-align: center !important;
                    z-index: 1000 !important;
                    border-bottom: 1px solid color-mix(in srgb, var(--foreground) 10%, transparent) !important;
                }
                
                .yarl__slide_title {
                    display: none !important;
                }

                /* Lightbox overlay background */
                .yarl__overlay {
                    background: color-mix(in srgb, var(--background) 90%, transparent) !important;
                }

                /* Lightbox container */
                .yarl__container {
                    background: transparent !important;
                }

                /* Lightbox slide */
                .yarl__slide {
                    background: var(--background) !important;
                }
                
                

                /* Lightbox navigation buttons */
            

                

                /* Lightbox captions */
                .yarl__captions_container {
                    background: color-mix(in srgb, var(--background) 70%, transparent) !important;
                    backdrop-filter: blur(8px) !important;
                    border: 1px solid color-mix(in srgb, var(--foreground) 10%, transparent) !important;
                }

                .yarl__caption {
                    color: var(--foreground) !important;
                    font-family: 'Suisse-Intl-Regular', Arial, Helvetica, sans-serif !important;
                }

                /* Lightbox counter */
                .yarl__counter {
                    color: var(--foreground) !important;
                    background: color-mix(in srgb, var(--background) 70%, transparent) !important;
                    backdrop-filter: blur(8px) !important;
                    border: 1px solid color-mix(in srgb, var(--foreground) 10%, transparent) !important;
                }

                /* Lightbox thumbnails */
                .yarl__thumbnails_container {
                    background: color-mix(in srgb, var(--background) 80%, transparent) !important;
                    backdrop-filter: blur(8px) !important;
                }

                .yarl__thumbnail {
                    border: 2px solid color-mix(in srgb, var(--foreground) 20%, transparent) !important;
                }

                .yarl__thumbnail_active {
                    border-color: var(--foreground) !important;
                }
            `}</style>

            {/* Fixed background text */}
            {/* Sliding sheet */}
            <motion.main 
                className="flex flex-col items-center w-full bg-background min-h-[70vh] relative z-10"
                
            >
                {/* Hero Section */}
                <HeroSection />
            </motion.main>
            {/* Project Galleries as siblings, each in their own section */}
            {projects.map((project) => (
                <section
                    key={project._id}
                    ref={el => { sectionRefs.current[project._id] = el; }}
                >
                    <ProjectGallery
                        project={project}
                        onLayoutControlBarClick={() => setActiveProjectId(project._id)}
                        onImageClick={(imageIndex) => openLightboxFromProject(project._id, imageIndex)}
                    />
                </section>
            ))}
            {/* Render NewsletterSignup at the bottom */}
            <NewsletterSignup />

            {/* Global Lightbox */}
            <Lightbox
                open={lightboxOpen}
                plugins={[Captions]}
                close={() => setLightboxOpen(false)}
                slides={unifiedGallery.map((item) => ({ src: item.src }))}
                index={photoIndex}
                on={{ view: ({ index }) => setPhotoIndex(index) }}
                render={{
                    buttonClose: () => (
                        <>
                            <div className="custom-lightbox-title-toolbar">
                                {currentProject?.projectTitle || ''}
                            </div>
                            <button
                                type="button"
                                className="yarl__button"
                                onClick={() => setLightboxOpen(false)}
                                style={{ 
                                    position: 'absolute',
                                    top: '2px',
                                    right: '24px',
                                    zIndex: 1001,
                                    borderRadius: '50%',
                                    width: '56px',
                                    height: '56px',
                                    color: 'var(--foreground)',
                                    fontSize: '32px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                aria-label="Close lightbox"
                            >
                                <CloseButton width={32} height={32} fill="currentColor" />
                            </button>
                        </>
                    ),
                    iconPrev: () => <LeftArrowIcon width={32} height={32} fill="currentColor" />, 
                    iconNext: () => <RightArrowIcon width={32} height={32} fill="currentColor" />
                }}
            />
        </div>
    );
}

export default HomeContent;
import { useState, useMemo } from 'react';
import type { Project } from '@/types/sanity';
import { urlForWebp } from '@/sanity/lib/image';

interface GalleryItem {
    src: string;
    projectId: string;
    projectTitle: string;
    imageIndex: number;
}

export function useLightbox(projects: Project[]) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    // Memoize the unified gallery for performance
    const unifiedGallery: GalleryItem[] = useMemo(() => {
        return projects.flatMap((project) => {
            const galleryImages = [
                ...(project.heroImage ? [project.heroImage] : []),
                ...((project.galleryImages || []).filter((img) => img !== project.heroImage))
            ];
            return galleryImages.map((imageUrl, index) => ({
                src: urlForWebp(imageUrl).url(),
                projectId: project._id,
                projectTitle: project.title,
                imageIndex: index
            }));
        });
    }, [projects]);

    // Get the current project info for the lightbox
    const currentProject = useMemo(() => {
        if (photoIndex >= 0 && photoIndex < unifiedGallery.length) {
            return unifiedGallery[photoIndex];
        }
        return null;
    }, [photoIndex, unifiedGallery]);

    // Open the lightbox from a specific project/image
    const openLightboxFromProject = (projectId: string, imageIndex: number) => {
        const globalIndex = unifiedGallery.findIndex(
            (item) => item.projectId === projectId && item.imageIndex === imageIndex
        );
        if (globalIndex !== -1) {
            setPhotoIndex(globalIndex);
            setLightboxOpen(true);
        }
    };

    return {
        lightboxOpen,
        setLightboxOpen,
        photoIndex,
        setPhotoIndex,
        unifiedGallery,
        currentProject,
        openLightboxFromProject,
    };
} 
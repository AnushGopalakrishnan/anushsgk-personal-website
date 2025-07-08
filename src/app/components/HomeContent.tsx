'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import type { Profile, Project } from '@/types/sanity';
import { useScrollAnimations } from './hooks/useScrollAnimations';
import { usePlaceholderLogic } from './utils/layoutUtils';
import { HeroSection } from './ui';
import { ProjectGallery } from './ui/ProjectGallery';
import NewsletterSignup from './ui/NewsletterSignup';

type LayoutType = 'featured' | 'grid' | 'feed';

interface HomeContentProps {
    profile: Profile;
    projects: Project[];
}

function HomeContent({ profile, projects }: HomeContentProps) {
    const { textRef, fontSize, yPos, rotateX, zoom } = useScrollAnimations();
    const { getPlaceholderColumnSpan, shouldShowPlaceholder } = usePlaceholderLogic();

    return (
        <div className="relative md:min-h-[185vh] xl:min-h-[150vh]">
            {/* Fixed background text */}
            {/* Sliding sheet */}
            <motion.main 
                className="flex flex-col items-center w-full bg-background min-h-screen relative z-10"
                
            >
                {/* Hero Section */}
                <HeroSection />
            </motion.main>
            {/* Project Galleries as siblings, each in their own section */}
            {projects.map((project) => (
                <section key={project._id}>
                    <ProjectGallery
                        project={project}
                    />
                </section>
            ))}
            {/* Render NewsletterSignup at the bottom */}
            <NewsletterSignup />
        </div>
    );
}

export default HomeContent;
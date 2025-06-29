'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Profile, Project } from '@/types/sanity';
import { 
    HeroSection, 
    BackgroundText, 
    ProjectGallery, 
    ComingSoonPlaceholder, 
    NewsletterSignup
} from './ui';
import { useScrollAnimations } from './hooks';
import { usePlaceholderLogic } from './utils/layoutUtils';

type LayoutType = 'featured' | 'grid' | 'feed';

interface HomeContentProps {
    profile: Profile;
    projects: Project[];
}

function HomeContent({ profile, projects }: HomeContentProps) {
    const { textRef, fontSize, yPos, rotateX, zoom } = useScrollAnimations();
    const { getPlaceholderColumnSpan, shouldShowPlaceholder } = usePlaceholderLogic();
    
    const [projectLayouts, setProjectLayouts] = useState<Record<string, LayoutType>>(() => {
        const initial: Record<string, LayoutType> = {};
        projects.forEach((p) => { initial[p._id] = 'featured'; });
        return initial;
    });

    const handleLayoutChange = (projectId: string, layout: LayoutType) => {
        setProjectLayouts((prev) => ({ ...prev, [projectId]: layout }));
    };

    return (
        <div className="relative md:min-h-[185vh] xl:min-h-[150vh]">
            {/* Fixed background text */}
            {/* Sliding sheet */}
            <motion.main 
                className="flex flex-col items-center w-full bg-background min-h-screen shadow-md relative z-10"
                style={{
                    y: yPos,
                    boxShadow: "0 0.602187px 0.602187px -1.25px #55667712, 0 2.28853px 2.28853px -2.5px #55667710, 0 10px 10px -3.75px #55667706"
                }}
            >
                {/* Hero Section */}
                <HeroSection />
            </motion.main>
            {/* Project Galleries as siblings, each in their own section */}
            {projects.map((project) => (
                <section key={project._id}>
                    <ProjectGallery
                        project={project}
                        layout={projectLayouts[project._id]}
                        setLayout={(layout) => handleLayoutChange(project._id, layout)}
                    />
                </section>
            ))}
            {/* Render NewsletterSignup at the bottom */}
            <NewsletterSignup />
        </div>
    );
}

export default HomeContent;
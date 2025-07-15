'use client';

import { Project } from '@/types/sanity';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLayout } from '../../components/contexts/LayoutContext';
import { urlForWebp } from '@/sanity/lib/image';

interface ProjectContentProps {
    project: Project;
}

type LayoutType = 'featured' | 'grid' | 'feed';

export default function ProjectContent({ project }: ProjectContentProps) {
    const { layout, setLayout } = useLayout();

    const getGridClassName = () => {
        switch (layout) {
            case 'featured':
                return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
            case 'grid':
                return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
            case 'feed':
                return "grid grid-cols-1 gap-6";
            default:
                return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
        }
    };

    return (
        <main className="min-h-screen w-full max-w-7xl mx-auto px-4 py-8">
            {/* Back button */}
            <Link 
                href="/"
                className="inline-flex items-center font-suisse text-foreground hover:text-primary transition-colors mb-8"
            >
                ← Back to projects
            </Link>

            {/* Project header */}
            <div className="mb-12">
                <h1 className="text-4xl font-suisse text-foreground mb-4">
                    {project.client ? `${project.title} for ${project.client}` : project.title}
                </h1>
                <p className="text-foreground/80 font-suisse max-w-2xl">
                    {project.description}
                </p>
            </div>

            {/* Layout controls */}
            <div className="flex gap-4 mb-6">
                {(['featured', 'grid', 'feed'] as LayoutType[]).map((layoutType) => (
                    <button
                        key={layoutType}
                        onClick={() => setLayout(layoutType)}
                        className={`px-4 py-2 rounded-md font-suisse ${
                            layout === layoutType 
                                ? 'bg-primary text-background' 
                                : 'bg-background text-foreground hover:bg-foreground/10'
                        }`}
                    >
                        {layoutType === 'featured' ? '1' : layoutType === 'grid' ? '2' : '3'}
                    </button>
                ))}
            </div>

            {/* Gallery grid */}
            <motion.div layout transition={{
    default: { ease: "linear" },
    layout: { duration: 0.3 }
  }} className={getGridClassName()}>
                {project.galleryImages?.map((imageUrl, index) => {
                    const featuredClass = layout === 'featured' && index === 0 ? 'md:col-span-2 md:row-span-2' : '';
                    return (
                        <motion.div
                            key={index}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ layout: { duration: 0.2, type: 'easeout' }, duration: 0.5, delay: index * 0.1 }}
                            className={`aspect-square relative overflow-hidden rounded-lg ${featuredClass}`}
                        >
                            <img
                                src={urlForWebp(imageUrl).url()}
                                alt={`${project.title} gallery image ${index + 1}`}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Video section if available */}
            {project.video && (
                <div className="mt-12">
                    <h2 className="text-2xl font-suisse text-foreground mb-6">
                        Project Video
                    </h2>
                    <div className="aspect-video w-full rounded-lg overflow-hidden">
                        <video
                            src={project.video}
                            controls
                            className="w-full h-full object-cover"
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            )}
        </main>
    );
}

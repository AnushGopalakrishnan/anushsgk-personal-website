import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Project } from '@/types/sanity';
import Arrow from '../svg/arrow';
import { LazyVideo } from './LazyVideo';
import { urlForWebp } from '@/sanity/lib/image';

interface ProjectCardProps {
    project: Project;
    index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
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
                                src={urlForWebp(project.heroImage).url()}
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
                        <div className='flex items-center gap-2'>
                            <h2 className="text-card-text-primary suisse-text text-sm md:text-xs xl:text-lg font-medium leading-tight tracking-tight">
                                {project.client ? `${project.title} for ${project.client}` : project.title}
                            </h2>
                            {project.projectUrl && (
                                <a 
                                    href={project.projectUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="group"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Arrow hoverColor="var(--bg-foreground)" />
                                </a>
                            )}
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
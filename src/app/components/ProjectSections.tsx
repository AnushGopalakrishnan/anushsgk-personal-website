import React from 'react';
import type { Project } from '@/types/sanity';
import { ProjectGallery } from './ui/ProjectGallery';

interface ProjectSectionsProps {
    projects: Project[];
    sectionRefs: React.MutableRefObject<{ [key: string]: HTMLElement | null }>;
    setActiveProjectId: (id: string) => void;
    openLightboxFromProject: (projectId: string, imageIndex: number) => void;
}

export function ProjectSections({ projects, sectionRefs, setActiveProjectId, openLightboxFromProject }: ProjectSectionsProps) {
    return (
        <>
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
        </>
    );
} 
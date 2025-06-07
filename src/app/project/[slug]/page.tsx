import { getProject } from '@/sanity/lib/queries';
import ProjectContent from './ProjectContent';

interface PageProps {
    params: {
        slug: string;
    };
}

export default async function ProjectPage({ params }: PageProps) {
    const project = await getProject(params.slug);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-foreground font-suisse">Project not found</p>
            </div>
        );
    }

    return <ProjectContent project={project} />;
}

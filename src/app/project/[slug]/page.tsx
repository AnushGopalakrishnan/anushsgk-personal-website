import { getProject } from '@/sanity/lib/queries';
import ProjectContent from './ProjectContent';

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;
    const project = await getProject(slug);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-foreground font-suisse">Project not found</p>
            </div>
        );
    }

    return <ProjectContent project={project} />;
}

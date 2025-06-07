import { getProfile, getProjects } from '@/sanity/lib/queries';
import HomeContent from './HomeContent';

async function HomeComponent() {
    const profile = await getProfile();
    const projects = await getProjects();

    return <HomeContent profile={profile} projects={projects} />;
}

export default HomeComponent;
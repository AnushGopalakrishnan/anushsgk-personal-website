export interface Project {
    _id: string;
    title: string;
    slug: string;
    description: string;
    heroImage?: string;
    video?: string;
    tags?: string[];
    galleryImages?: string[];
    projectUrl?: string;
}

export interface Profile {
    name: string;
    role: string;
    bio: string;
    avatar?: string;
    email?: string;
    location?: string;
    availableForHire: boolean;
    socialLinks?: {
        platform: string;
        url: string;
    }[];
}

import { groq } from 'next-sanity'
import { client } from './client'

// Set cache tags for revalidation
const profileCacheTag = 'profile'
const projectsCacheTag = 'projects'

export async function getProfile() {
  return client.fetch(
    groq`*[_type == "profile"][0]{
      name,
      role,
      bio,
      "avatar": avatar.asset->url,
      email,
      location,
      availableForHire,
      socialLinks[]{
        platform,
        url
      }
    }`,
    undefined,
  )
}

export async function getProjects() {
  return client.fetch(
    groq`*[_type == "project"] | order(_createdAt desc){
      _id,
      title,
      "slug": slug.current,
      description,
      "heroImage": heroImage.asset->url,
      "video": video.asset->url,
      "tags": tags[],
      "galleryImages": galleryImages[].asset->url,
      projectUrl,
      client
    }`,
    undefined,
    
  )
}

export async function getProject(slug: string) {
  return client.fetch(
    groq`*[_type == "project" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      description,
      "heroImage": heroImage.asset->url,
      "video": video.asset->url,
      "tags": tags[],
      "galleryImages": galleryImages[].asset->url,
      projectUrl,
      client
    }`,
    { slug }
  )
}

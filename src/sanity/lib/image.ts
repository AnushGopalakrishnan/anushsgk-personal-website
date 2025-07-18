import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)  
}

export const urlForWebp = (source: SanityImageSource) => {
  return builder.image(source).auto('format').quality(80);
}

// Utility to generate srcSet for responsive images
export function getSanityImageSrcSet(source: SanityImageSource, widths = [400, 800, 1200, 1600, 2000]) {
  return widths
    .map(w => `${builder.image(source).width(w).auto('format').url()} ${w}w`)
    .join(', ');
}

// Default sizes for responsive images
export const defaultSanityImageSizes =
  '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';

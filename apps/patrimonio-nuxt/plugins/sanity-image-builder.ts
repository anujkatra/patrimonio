import imageUrlBuilder from '@sanity/image-url'
import type {SanityImageSource, SanityProjectDetails} from '@sanity/image-url/lib/types/types'

const sanityConfig: SanityProjectDetails = {
  projectId: process.env.NUXT_SANITY_PROJECT_ID ?? '',
  dataset: process.env.NUXT_SANITY_DATASET ?? 'development',
}

export default defineNuxtPlugin(() => {
  const builder = imageUrlBuilder(sanityConfig)
  function urlFor(source: SanityImageSource) {
    return builder.image(source).auto('format')
  }
  return {
    provide: {urlFor},
  }
})

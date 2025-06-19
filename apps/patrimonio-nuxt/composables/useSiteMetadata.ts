export type Robots = {
  noindex?: boolean
  nofollow?: boolean
  noarchive?: boolean
  nositelinkssearchbox?: boolean
  nosnippet?: boolean
  indexifembedded?: boolean
  maxSnippet?: number
  maxImagePreview?: 'none' | 'standard' | 'large'
  maxVideoPreview?: number
  notranslate?: boolean
  noimageindex?: boolean
  unavailable_after?: string
}

type SiteMetadata = {
  title?: string
  description?: string
  ogImage?: string
  robots: Robots
}

export function useSiteMetadata({title, description, ogImage, robots}: SiteMetadata) {
  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description,
    twitterCard: 'summary',
    ogImage,
    robots: robots,
  })

  useHead({
    htmlAttrs: {
      lang: 'en',
    },
    link: [
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon.ico',
      },
    ],
  })
}

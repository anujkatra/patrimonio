import type {Seo} from '~/sanity/types'

export interface Robots {
  _type?: 'robots'
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

export function useSiteMetadata(seo?: Seo) {
  const {$urlFor} = useNuxtApp()
  const seoImageUrl = seo?.image?.asset?._ref ? $urlFor(seo?.image?.asset?._ref).url() : ''
  const ogImageUrl = seo?.opengraph?.image?.asset?._ref
    ? $urlFor(seo?.opengraph?.image?.asset?._ref).url()
    : seoImageUrl
  const twitterImageUrl = seo?.twitter?.image?.asset?._ref
    ? $urlFor(seo?.twitter?.image?.asset?._ref).url()
    : seoImageUrl

  const {_type, ...seoRobots} = seo?.robots
    ? seo.robots
    : {
        _type: 'robots',
        noindex: false,
        nofollow: false,
        noarchive: false,
        nositelinkssearchbox: false,
        nosnippet: false,
        indexifembedded: false,
        maxSnippet: -1,
        maxImagePreview: 'large',
        maxVideoPreview: -1,
        notranslate: false,
        noimageindex: false,
      }

  const title = seo?.title
    ? seo?.noTitleSuffix === true
      ? seo?.title
      : `${seo?.title} | Patrimonio`
    : 'Patrimonio'

  useSeoMeta({
    title: title,
    description: seo?.description,
    ogImage: ogImageUrl,
    ogTitle: seo?.opengraph?.title ?? title,
    ogDescription: seo?.opengraph?.description ?? seo?.description,
    twitterTitle: seo?.twitter?.title ?? title,
    twitterDescription: seo?.twitter?.description ?? seo?.description,
    twitterImage: twitterImageUrl,
    twitterCard: 'summary',
    robots: seoRobots,
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

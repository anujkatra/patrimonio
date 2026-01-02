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
  const url = seo?.image?.asset?._ref ? $urlFor(seo?.image?.asset?._ref).url() : ''
  const {_type, ...seoRobots} = seo?.robots
    ? seo.robots
    : {noindex: false, nofollow: false, _type: 'robots'}

  const title = seo?.title
    ? seo?.noTitleSuffix === true
      ? seo?.title
      : `${seo?.title} | Patrimonio`
    : 'Patrimonio'

  useSeoMeta({
    title: title,
    description: seo?.description,
    ogImage: url,
    ogTitle: title,
    ogDescription: seo?.description,
    twitterTitle: title,
    twitterDescription: seo?.description,
    twitterImage: url,
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

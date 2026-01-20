import type {SitemapUrlInput} from '#sitemap/types'
import {sitemapQuery} from '~/sanity/queries'
import type {SitemapQueryResult} from '~/sanity/types'

const SingletonURLs: {[type: string]: string; url: string}[] = [
  {type: 'artists', url: '/artists'},
  {type: 'blogPage', url: '/blog'},
  {type: 'contactUsPage', url: '/contact-us'},
  {type: 'eventsPage', url: '/events'},
  {type: 'gallery', url: '/gallery'},
  {type: 'homepage', url: '/'},
  {type: 'ourStory', url: '/our-story'},
  {type: 'pressPage', url: '/press'},
]

export default defineSitemapEventHandler(async () => {
  try {
    const sanity = useSanity()
    const {blogs, paintings, events, artists, singletons} =
      await sanity.client.fetch<SitemapQueryResult>(sitemapQuery)

    return [
      ...SingletonURLs.map((url) => ({
        loc: url.url,
        lastmod: singletons[url.type as keyof SitemapQueryResult['singletons']]?._updatedAt ?? '',
      })),
      ...blogs.map((url) => ({
        loc: `/blog/${url.slug.current}`,
        lastmod: url._updatedAt,
      })),
      ...paintings.map((url) => ({
        loc: `/gallery/${url.slug.current}`,
        lastmod: url._updatedAt,
      })),
      ...events.map((url) => ({
        loc: `/events/${url.slug.current}`,
        lastmod: url._updatedAt,
      })),
      ...artists.map((url) => ({
        loc: `/artists/${url.slug.current}`,
        lastmod: url._updatedAt,
      })),
    ] satisfies SitemapUrlInput[]
  } catch (err) {
    console.error('err fetching sitemap urls', err)
    return []
  }
})

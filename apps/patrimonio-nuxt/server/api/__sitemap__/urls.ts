import { sitemapBlogQuery } from "~/sanity/queries"
import type { SitemapBlogQueryResult } from "~/sanity/types"

export default defineSitemapEventHandler(async () => {
  let urls:SitemapBlogQueryResult = []
    try {
    const sanity = useSanity()
    urls = await sanity.client.fetch<SitemapBlogQueryResult>(sitemapBlogQuery)
  console.log("resp",urls)
  } catch (err) {
    console.log('err', err)
  }

//   const {data: paintingData} = await useSanityQuery<SitemapPaintingQueryResult>(sitemapPaintingQuery)
//   // URLs are already encoded: [{ path: '/products/%24pecial' }]
//   console.log("test",paintingData)

  return urls.map(url => ({
    loc: `/blog/${url.slug.current}`,
    lastmod: url._updatedAt,
  }))
})

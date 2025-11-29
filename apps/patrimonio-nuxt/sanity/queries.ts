import {defineQuery} from 'groq'

export const homepageQuery = defineQuery(`*[_type == "homepage"][0] {
	...,
	landingCarousel[]->{
		picture{
			...,
			asset->,
		}
	},
	featuredCollections[]->{
		title,
		slug,
		paintings[0]->{
			picture{
				...,
				asset->,
			}
		}
	},
	featuredPaintings[]->{
		name,
		"artist":artist->.name,
		year,
		"medium":medium->.name,
		picture{
			...,
			asset->,
		}
	},
	featuredArtists[]->{
		name,
		slug,
		picture{
			...,
			asset->,
		}
	},
	featuredEvents[]->{
		title,
		slug,
		venue,
		dateRange,
		pictures[0]{
			...,
			asset->,
		},
		"artist":artists[0]->.name,
	},
	featuredPress[]->{
		title,
		slug,
		excerpt,
		link,
		featuredImage{
			...,
			asset->,
		},
	},
}`)

export const artistsPageQuery = defineQuery(`*[_type == "artists"][0] {
	...,
	featuredArtists[]->{
		name,
		slug,
		location,
		picture{
			...,
			...asset-> {
    			caption,
    			...metadata {
      				lqip, // the lqip can be used for blurHashUrl or other low-quality placeholders
      				...dimensions {
        				width,
        				height
      				}
    			}
  			}
		}
	},
}`)

export const ourStoryPageQuery = defineQuery(`*[_type == "ourStory"][0]`)

export const galleryPageQuery = defineQuery(`*[_type == "gallery"][0]`)

export const galleryFilterQuery = defineQuery(`{
	'startYear': *[_type == "painting"] | order(year asc)[0].year,
	'endYear': *[_type == "painting"] | order(year desc)[0].year,
	'artists': *[_type == "artist"]{_id,name,slug},
	'collections': *[_type == "collection"]{_id,title,slug},
	'mediums': *[_type == "medium"]{_id,name,slug}
	}`)

export const galleryCountQuery = defineQuery(
  `count(*[_type == "painting" && ($artist == '' || artist._ref == $artist) && ($medium == '' || medium._ref == $medium) && ($startYear == 0 || (year>=$startYear && year<$endYear)) && ($forSaleOnly == false || forSale == true)])`,
)

export const galleryPaintingFilterQuery =
  defineQuery(`*[_type == "painting" && ($collection == '' || _id in *[_type == "collection" && slug.current == $collection][0].paintings[]._ref) && ($artist == '' || artist._ref == $artist) && ($medium == '' || medium._ref == $medium) && ($startYear == 0 || (year>=$startYear && year<$endYear)) && ($forSaleOnly == false || forSale == true)] | order(year desc)[$startIndex...$endIndex]{
	_id,
  	slug,
  	name,
	"artist":artist->.name,
	year,
	"medium":medium->.name,
  	picture,
  	publishedAt,
}`)

export const artistQuery =
  defineQuery(`*[_type == "artist" && defined(slug.current) && slug.current==$slug][0] {
	...,
	picture{
		...,
		...asset-> {
    		caption,
    		...metadata {
    			lqip, // the lqip can be used for blurHashUrl or other low-quality placeholders
  				...dimensions {
        				width,
        				height
  				}
			}
		}
	},
	featuredPaintings[]->{
		name,
		"artist":artist->.name,
		year,
		"medium":medium->.name,
		picture{
			...,
			asset->,
		}
	},
}`)

export const paintingQuery =
  defineQuery(`*[_type == "painting" && defined(slug.current) && slug.current==$slug][0] {
	name,
	slug,
	picture,
	"artist":artist->.name,
	year,
	"medium":medium->.name,
	description,
}`)

export const eventsPageQuery = defineQuery(`*[_type == "eventsPage"][0]`)

export const eventsPageFilterQuery = defineQuery(`{
'startYear': *[_type == "event"] | order(dateRange.startDate asc)[0].dateRange.startDate,
'endYear': *[_type == "event"] | order(dateRange.startDate desc)[0].dateRange,
'artists': *[_type == "artist"]{_id,name,slug},
'auctionHouse': *[_type == "auctionHouse"]{_id,name,slug}}`)

export const eventsPageCountQuery = defineQuery(`{
'auction': count(*[_type == "event" && type == 'auction']),
'artShow': count(*[_type == "event" && type == 'art-show']),
'soloShow': count(*[_type == "event" && type == 'solo-show']),
}`)

export const eventQuery =
  defineQuery(`*[_type == "event" && defined(slug.current) && slug.current==$slug][0] {
	...,
	artists[]->{
		name,
		slug,
		picture,
	},
	paintings[]->{
		name,
		"artist":artist->.name,
		year,
		"medium":medium->.name,
		picture{
			...,
			asset->,
		}
	},
}`)

export const pressPageQuery = defineQuery(`*[_type == "pressPage"][0]`)

export const pressQuery = defineQuery(`*[_type == "press" && hidden==false]`)

export const blogPageQuery = defineQuery(`*[_type == "blogPage"][0]`)

export const blogQuery = defineQuery(`*[_type == "blog" && hidden==false][$startIndex...$endIndex]`)

export const blogCountQuery = defineQuery(`count(*[_type == "blog" && hidden==false])`)

export const individualBlogQuery = defineQuery(
  `*[_type == "blog" && defined(slug.current) && slug.current==$slug && hidden==false][0] {
	title,
	subtitle,
	featuredImage,
	description,
	author,
	publishDate,
	slug,
	seo,
  }`,
)

export const contactUsPageQuery = defineQuery(`*[_type == "contactUsPage"][0]`)

// export const pageQuery = defineQuery(/* groq */ `
// 		*[_type == "page" && defined(slug.current) && slug.current == $slug][0]{
// 			...,
// 		}`);

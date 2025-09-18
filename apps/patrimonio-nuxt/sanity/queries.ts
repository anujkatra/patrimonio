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

// export const pageQuery = defineQuery(/* groq */ `
// 		*[_type == "page" && defined(slug.current) && slug.current == $slug][0]{
// 			...,
// 		}`);

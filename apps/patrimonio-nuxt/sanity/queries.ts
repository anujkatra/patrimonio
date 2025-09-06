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

// export const pageQuery = defineQuery(/* groq */ `
// 		*[_type == "page" && defined(slug.current) && slug.current == $slug][0]{
// 			...,
// 		}`);

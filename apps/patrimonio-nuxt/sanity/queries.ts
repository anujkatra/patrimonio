import {defineQuery} from 'groq'

export const homepageQuery = defineQuery(`*[_type == "homepage"][0] {
	...,
	landingImage{
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
	}`)

export const aboutUsPageQuery = defineQuery(`*[_type == "aboutUs"][0] {
	...,
	pictures[]{
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
				},
				}
	}
	`)

// export const pageQuery = defineQuery(/* groq */ `
// 		*[_type == "page" && defined(slug.current) && slug.current == $slug][0]{
// 			...,
// 		}`);

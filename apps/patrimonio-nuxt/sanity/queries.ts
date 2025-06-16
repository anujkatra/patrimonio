import {defineQuery} from 'groq'

export const homepageQuery = defineQuery(`*[_type == "homepage"][0] {
	...,
	landingImage{
	...,
	asset->,
	}
	}`)

// export const pageQuery = defineQuery(/* groq */ `
// 		*[_type == "page" && defined(slug.current) && slug.current == $slug][0]{
// 			...,
// 		}`);

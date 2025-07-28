import {artist} from './documents/artist'
import {medium} from './documents/medium'
import {painting} from './documents/painting'
import {aboutUs} from './singletons/about-us-page'
import {artists} from './singletons/artists'
import {auctions} from './singletons/auctions'
import {gallery} from './singletons/gallery'
import {homepage} from './singletons/homepage'
import {shows} from './singletons/shows'
import {event} from './documents/event'
import {dateRange} from './objects/dateRange'
import {featuredSection} from './objects/featuredSection'
import {seo} from './objects/seo'
import {opengraph} from './objects/seo/opengraph'
import {robots} from './objects/seo/robots'
import {twitter} from './objects/seo/twitter'
import {collection} from './documents/collection'
import {press} from './documents/press'

export const schemaTypes = [
  // Singletons
  homepage,
  aboutUs,
  gallery,
  artists,
  shows,
  auctions,
  // Documents
  artist,
  collection,
  event,
  medium,
  painting,
  press,
  // Objects
  dateRange,
  seo,
  robots,
  opengraph,
  twitter,
  featuredSection,
]

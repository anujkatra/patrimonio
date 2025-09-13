import {artist} from './documents/artist'
import {medium} from './documents/medium'
import {painting} from './documents/painting'
import {ourStory} from './singletons/our-story-page'
import {artists} from './singletons/artists'
import {gallery} from './singletons/gallery'
import {homepage} from './singletons/homepage'
import {event} from './documents/event'
import {dateRange} from './objects/dateRange'
import {featuredSection} from './objects/featuredSection'
import {seo} from './objects/seo'
import {opengraph} from './objects/seo/opengraph'
import {robots} from './objects/seo/robots'
import {twitter} from './objects/seo/twitter'
import {collection} from './documents/collection'
import {press} from './documents/press'
import {eventsPage} from './singletons/events-page'
import {auctionHouse} from './documents/auction-house'

export const schemaTypes = [
  // Singletons
  homepage,
  ourStory,
  gallery,
  artists,
  eventsPage,
  // Documents
  artist,
  collection,
  event,
  medium,
  painting,
  press,
  auctionHouse,
  // Objects
  dateRange,
  seo,
  robots,
  opengraph,
  twitter,
  featuredSection,
]

import {defineLocations, PresentationPluginOptions} from 'sanity/presentation'

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    painting: defineLocations({
      select: {
        title: 'name',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: `/gallery/${doc?.slug}`,
          },
        ],
      }),
    }),
    blog: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: `/blog/${doc?.slug}`,
          },
        ],
      }),
    }),
    event: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: `/events/${doc?.slug}`,
          },
        ],
      }),
    }),
    artist: defineLocations({
      select: {
        title: 'name',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: `/artists/${doc?.slug}`,
          },
        ],
      }),
    }),
    //Singletons
    homepage: defineLocations({
      select: {title: 'title'},
      resolve: () => ({
        locations: [{title: 'Home Page', href: '/'}],
      }),
    }),
    ourStory: defineLocations({
      select: {title: 'title'},
      resolve: () => ({
        locations: [{title: 'Our Story Page', href: '/our-story'}],
      }),
    }),
    gallery: defineLocations({
      select: {title: 'title'},
      resolve: () => ({
        locations: [{title: 'Gallery Page', href: '/gallery'}],
      }),
    }),
    artists: defineLocations({
      select: {title: 'title'},
      resolve: () => ({
        locations: [{title: 'Artists Page', href: '/artists'}],
      }),
    }),
    eventsPage: defineLocations({
      select: {title: 'title'},
      resolve: () => ({
        locations: [{title: 'Events Page', href: '/events'}],
      }),
    }),
    pressPage: defineLocations({
      select: {title: 'title'},
      resolve: () => ({
        locations: [{title: 'Press Page', href: '/press'}],
      }),
    }),
    blogPage: defineLocations({
      select: {title: 'title'},
      resolve: () => ({
        locations: [{title: 'Blog Page', href: '/blog'}],
      }),
    }),
    contactUsPage: defineLocations({
      select: {title: 'title'},
      resolve: () => ({
        locations: [{title: 'Contact Us Page', href: '/contact-us'}],
      }),
    }),
  },
}

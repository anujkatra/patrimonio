import {defineField, DocumentDefinition} from 'sanity'
import {CalendarIcon} from '@sanity/icons'
import {withSeo} from '../../helpers/document'

export const eventsPage: DocumentDefinition = withSeo({
  name: 'eventsPage',
  title: 'Events Page',
  type: 'document',
  icon: CalendarIcon,
  preview: {
    prepare: () => ({
      title: 'Events Page',
    }),
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      description: 'A tagline/subtitle for the Artists Page',
      type: 'text',
    }),
    defineField({
      name: 'auctions',
      title: 'Auctions',
      description: "Add all auctions that you'd like to display on the events page",
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'event',
            },
          ],
          options: {filter: 'type == "auction"', disableNew: true},
        },
      ],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'artShows',
      title: 'Art Shows',
      description: "Add all art shows that you'd like to display on the events page",
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'event',
            },
          ],
          options: {filter: 'type == "art-show"', disableNew: true},
        },
      ],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'soloShows',
      title: 'Solo Shows',
      description: "Add all solo shows that you'd like to display on the events page",
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'event',
            },
          ],
          options: {filter: 'type == "solo-show"', disableNew: true},
        },
      ],
      validation: (Rule) => Rule.unique(),
    }),
  ],
})

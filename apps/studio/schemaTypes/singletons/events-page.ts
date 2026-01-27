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
  ],
})

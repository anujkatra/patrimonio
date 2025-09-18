import {defineField, DocumentDefinition} from 'sanity'
import {DocumentIcon} from '@sanity/icons'
import {withSeo} from '../../helpers/document'

export const blogPage: DocumentDefinition = withSeo({
  name: 'blogPage',
  title: 'Blog Page',
  type: 'document',
  icon: DocumentIcon,
  preview: {
    prepare: () => ({
      title: 'Blog Page',
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
      description: 'A tagline/subtitle for the Blog Page',
      type: 'text',
    }),
  ],
})

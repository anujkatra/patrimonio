import {defineField, DocumentDefinition} from 'sanity'
import {DocumentIcon} from '@sanity/icons'
import {withSeo} from '../../helpers/document'

export const artists: DocumentDefinition = withSeo({
  name: 'artists',
  title: 'Artists Page',
  type: 'document',
  icon: DocumentIcon,
  preview: {
    prepare: () => ({
      title: 'Artists Page',
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
      type: 'string',
    }),
    defineField({
      title: 'Featured Artists',
      name: 'featuredArtists',
      type: 'array',
      description: 'Featured Artists',
      validation: (Rule) => Rule.unique(),
      of: [
        {
          type: 'reference',
          to: [{type: 'artist'}],
          options: {
            disableNew: true,
          },
        },
      ],
    }),
  ],
})

import {defineField, DocumentDefinition} from 'sanity'
import {DocumentIcon} from '@sanity/icons'
import {withSeo} from '../../helpers/document'

export const auctions: DocumentDefinition = withSeo({
  name: 'auctions',
  title: 'Auctions Page',
  type: 'document',
  icon: DocumentIcon,
  preview: {
    prepare: () => ({
      title: 'Auctions Page',
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
      name: 'content',
      type: 'array',
      title: 'Content',
      description: 'Content block for the Auction Page',
      validation: (Rule) => Rule.required(),
      of: [{type: 'block'}],
    }),
  ],
})

import {defineField, DocumentDefinition} from 'sanity'
import {DocumentIcon} from '@sanity/icons'
import {withSeo} from '../../helpers/document'

export const shows: DocumentDefinition = withSeo({
  name: 'shows',
  title: 'Shows Page',
  type: 'document',
  icon: DocumentIcon,
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
      description: 'Content block for the Shows Page',
      validation: (Rule) => Rule.required(),
      of: [{type: 'block'}],
    }),
  ],
})

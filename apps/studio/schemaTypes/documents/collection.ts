import {defineField, DocumentDefinition} from 'sanity'
import {DocumentIcon} from '@sanity/icons'
import {withSeo} from '../../helpers/document'

export const collection: DocumentDefinition = withSeo({
  name: 'collection',
  title: 'Collection',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'A slug is required to generate a unique value for the collection',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      title: 'Collection Paintings',
      name: 'paintings',
      type: 'array',
      description: 'Paintings in this collection (max 30)',
      validation: (Rule) => Rule.unique().max(30),
      of: [
        {
          type: 'reference',
          to: [{type: 'painting'}],
          options: {
            disableNew: true,
          },
        },
      ],
      options: {
        layout: 'grid',
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      paintings: 'paintings.0.picture',
    },
    prepare(selection) {
      const {title, paintings} = selection
      return {
        title: title,
        media: paintings ? paintings : undefined,
      }
    },
  },
})

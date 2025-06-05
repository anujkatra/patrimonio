import {defineField, DocumentDefinition} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export const medium: DocumentDefinition = {
  name: 'medium',
  title: 'Medium',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Medium Name',
      type: 'string',
      validation: (rule) => [
        rule.required().max(200).error('A name of max 200 characters is required'),
      ],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        slugify: (input) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
}

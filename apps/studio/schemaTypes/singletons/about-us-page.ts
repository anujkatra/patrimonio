import {defineField, DocumentDefinition} from 'sanity'
import {DocumentIcon} from '@sanity/icons'
import {withSeo} from '../../helpers/document'

export const aboutUs: DocumentDefinition = withSeo({
  name: 'aboutUs',
  title: 'About Us Page',
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
      name: 'content',
      type: 'array',
      title: 'Content',
      description: 'Content block for the Story Section',
      validation: (Rule) => Rule.required(),
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'pictures',
      title: 'Pictures',
      type: 'array',
      description: 'Pictures for the About Us Page (max 5)',
      validation: (rule) => rule.max(5),
      of: [
        {
          name: 'image',
          type: 'image',
          title: 'Image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
          ],
        },
      ],
      options: {
        layout: 'grid',
      },
    }),
  ],
})

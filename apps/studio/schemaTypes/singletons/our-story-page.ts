import {defineField, DocumentDefinition} from 'sanity'
import {DocumentIcon} from '@sanity/icons'
import {withSeo} from '../../helpers/document'

export const ourStory: DocumentDefinition = withSeo({
  name: 'ourStory',
  title: 'Our Story Page',
  type: 'document',
  icon: DocumentIcon,
  preview: {
    prepare: () => ({
      title: 'Our Story Page',
    }),
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'title for the landing section',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'content',
      type: 'array',
      title: 'Content',
      description: 'Content block for the landing section',
      validation: (Rule) => Rule.required(),
      of: [{type: 'block'}],
    }),
    defineField({
      title: 'Team Section',
      name: 'ourTeam',
      type: 'array',
      description: 'Content for the Team Members',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'Title of team member section',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              description: 'Name of team member',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'designation',
              title: 'Designation',
              type: 'string',
              description: 'Designation of team member',
            }),
            defineField({
              name: 'content',
              type: 'array',
              title: 'Content',
              description: 'Content block for the team member',
              validation: (Rule) => Rule.required(),
              of: [{type: 'block'}],
            }),
            defineField({
              name: 'picture',
              title: 'Picture',
              type: 'image',
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative text',
                  description: 'Important for SEO and accessiblity.',
                  validation: (rule) => {
                    return rule.custom((alt, context) => {
                      if ((context.document?.picture as any)?.asset?._ref && !alt) {
                        return 'Required'
                      }
                      return true
                    })
                  },
                },
              ],
              options: {
                hotspot: true,
              },
              validation: (rule) => rule.required(),
            }),
          ],
        },
      ],
    }),
  ],
})

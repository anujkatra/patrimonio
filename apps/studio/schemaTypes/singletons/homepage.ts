import {defineArrayMember, defineField, DocumentDefinition} from 'sanity'
import {DocumentIcon} from '@sanity/icons'
import {withSeo} from '../../helpers/document'

export const homepage: DocumentDefinition = withSeo({
  name: 'homepage',
  title: 'Home Page',
  type: 'document',
  description: 'Content for the Home Page of the Website',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'landingText',
      title: 'Landing Text',
      description: 'Landing Text for the Home Page',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'landingCta',
      title: 'Landing Call to Action (CTA)',
      type: 'object',
      fields: [
        defineField({
          name: 'ctaText',
          title: 'CTA Text',
          type: 'string',
          validation: (rule) =>
            rule.custom((name, context) => {
              if (typeof name === 'undefined') {
                return true // Allow undefined values
              }

              // This would crash if we didn't check
              // for undefined values first
              return (context.document?.landingCta as any).ctaLink === undefined
                ? 'Please add CTA Link'
                : true
            }),
        }),
        defineField({
          name: 'ctaLink',
          title: 'CTA Link',
          type: 'url',
          validation: (Rule) => [
            Rule.uri({
              scheme: ['https', 'mailto', 'tel'],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'landingImage',
      title: 'Landing Image',
      description: 'Landing Image for the Home Page',
      type: 'image',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessiblity.',
          validation: (rule) => rule.required(),
        },
      ],
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featuredSection',
      title: 'Featured Section',
      description: 'Landing Page Featured Sections',
      type: 'array',
      of: [{type: 'featuredSection'}],
    }),
    defineField({
      title: 'Featured Paintings',
      name: 'featuredPaintings',
      type: 'array',
      description: 'Featured Paintings (max 20)',
      validation: (Rule) => Rule.unique().max(20),
      of: [
        {
          type: 'reference',
          to: [{type: 'painting'}],
          options: {
            disableNew: true,
          },
        },
      ],
    }),
    defineField({
      title: 'Featured Events',
      name: 'featuredEvents',
      type: 'array',
      description: 'Featured Events (max 10)',
      validation: (Rule) => Rule.unique().max(5),
      of: [
        {
          type: 'reference',
          to: [{type: 'event'}],
          options: {
            disableNew: true,
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'Homepage',
    },
  },
})

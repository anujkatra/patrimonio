import {defineField, DocumentDefinition} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export const painting: DocumentDefinition = {
  name: 'painting',
  title: 'Painting',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Painting Name',
      type: 'string',
      validation: (rule) => [
        rule.required().max(200).error('A name of max 200 characters is required'),
        rule.max(50).warning("The name shouldn't be more than 200 characters."),
      ],
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
    defineField({
      name: 'artist',
      title: 'Artist',
      description: 'The artist of the painting',
      type: 'reference',
      to: [{type: 'artist'}],
      options: {
        disableNew: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Year',
      name: 'year',
      type: 'number',
      description: 'The year the painting was created (Range: 1940 - Current Year)',
      initialValue: () => new Date().getFullYear(),
      validation: (Rule) =>
        Rule.required().min(1940).max(new Date().getFullYear()).integer().positive(),
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensions',
      type: 'object',
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: 'height',
          type: 'number',
          validation: (Rule) => Rule.required().positive().min(0).max(10000),
        },
        {
          name: 'width',
          type: 'number',
          validation: (Rule) => Rule.required().positive().min(0).max(10000),
        },
        {
          name: 'unit',
          type: 'string',
          validation: (Rule) => Rule.required(),
          options: {
            list: [
              {title: 'Inch', value: 'in'},
              {title: 'Feet', value: 'ft'},
              {title: 'Centimeter', value: 'cm'},
              {title: 'Meter', value: 'm'},
            ],
          },
        },
      ],
    }),
    defineField({
      title: 'Medium',
      name: 'medium',
      type: 'reference',
      to: [{type: 'medium'}],
    }),
    defineField({
      title: 'Is the Painting Featured?',
      name: 'featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      title: 'Is the Painting for Sale?',
      name: 'forSale',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Name, Alphabetical',
      name: 'nameAlphabetical',
      by: [{field: 'name', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'artist.name',
      media: 'picture',
    },
  },
}

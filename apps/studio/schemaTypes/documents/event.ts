import {defineArrayMember, defineField, DocumentDefinition} from 'sanity'
import {DocumentIcon} from '@sanity/icons'
import {withSeo} from '../../helpers/document'

export const event: DocumentDefinition = withSeo({
  name: 'event',
  title: 'Event',
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
      description: 'A slug is required to generate a unique value for the event',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    {
      name: 'type',
      title: 'Event Type',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          {title: 'Art Show', value: 'art-show'},
          {title: 'Auction', value: 'auction'},
          {title: 'Solo Show', value: 'solo-show'},
        ],
      },
    },
    defineField({
      name: 'auctionHouse',
      title: 'Auction House',
      type: 'string',
      hidden: ({document}) => document?.type !== 'auction',
    }),
    defineField({
      name: 'venue',
      title: 'Venue',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dateRange',
      title: 'Date',
      type: 'dateRange',
      description: 'Date of the Event',
    }),
    defineField({
      title: 'Link',
      name: 'link',
      type: 'url',
      description: 'Link to Event Website',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Pictures',
      name: 'pictures',
      type: 'array',
      description: 'Pictures from the Event (max 30)',
      validation: (rule) => rule.max(30),
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
    defineField({
      title: 'Featured Paintings',
      name: 'paintings',
      type: 'array',
      description: 'Featured Paintings (max 30)',
      validation: (Rule) => Rule.unique().max(30),
      of: [
        {
          type: 'reference',
          to: [{type: 'painting'}],
        },
      ],
    }),
    defineField({
      title: 'Featured Artists',
      name: 'artists',
      type: 'array',
      description: 'Featured Artists (max 10)',
      validation: (Rule) => Rule.unique().max(10),
      of: [
        {
          type: 'reference',
          to: [{type: 'artist'}],
        },
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'A short description of the event displayed on other pages',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})

import {defineField, DocumentDefinition} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export const auctionHouse: DocumentDefinition = {
  name: 'auctionHouse',
  title: 'Auction House',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Auction House Name',
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
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
}

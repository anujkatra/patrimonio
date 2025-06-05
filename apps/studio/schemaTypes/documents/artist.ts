import {defineArrayMember, defineField, DocumentDefinition} from 'sanity'
import {UserIcon} from '@sanity/icons'

export const artist: DocumentDefinition = {
  name: 'artist',
  title: 'Artist',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) =>
        Rule.required().max(200).warning(`A name shouldn't be more than 200 characters.`),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      // hidden: ({currentUser}) => {
      //   return !currentUser?.roles.find(({name}) => name === 'administrator')
      // },
      options: {
        source: 'title',
        slugify: (input) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
        }),
      ],
      validation: (Rule) => Rule.required(),
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
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'A short description of the artist displayed on other pages',
      validation: (Rule) => Rule.required(),
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
      media: 'picture',
    },
  },
}

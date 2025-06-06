import {defineField, ObjectDefinition} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

const sectionTypes = [
  {title: 'Artist Spotlight', value: 'artist'},
  {title: 'Featured Artwork', value: 'painting'},
  {title: 'Featured Event', value: 'event'},
]

export const featuredSection: ObjectDefinition = {
  name: 'featuredSection',
  title: 'Featured Section',
  type: 'object',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'type',
      type: 'string',
      title: 'Featured Section Type',
      validation: (Rule) => Rule.required(),
      readOnly: ({parent}) => (parent.section ? true : false),
      options: {
        list: sectionTypes,
      },
    }),
    defineField({
      name: 'section',
      type: 'reference',
      title: 'Featured Section',
      to: [{type: 'artist'}, {type: 'painting'}, {type: 'event'}],
      options: {
        disableNew: true,
        filter: ({parent}) => {
          return {
            filter: '_type == $type',
            params: {
              type: `${parent?.type}`,
            },
          }
        },
      },
      validation: (Rule) => Rule.required(),
      readOnly: ({parent}) => !parent.type,
    }),
  ],
  preview: {
    select: {
      type: 'type',
      name: 'section.name',
      title: 'section.title',
      picture: 'section.picture',
      eventPicture: 'section.pictures',
    },
    prepare(selection) {
      const {type, name, title, picture, eventPicture} = selection
      const typeName =
        type && sectionTypes.flatMap((option) => (option.value === type ? [option.title] : []))
      return {
        title: name ? name : title,
        subtitle: type ? typeName[0] : type,
        media: type === 'event' ? (eventPicture ? eventPicture[0] : undefined) : picture,
      }
    },
  },
}

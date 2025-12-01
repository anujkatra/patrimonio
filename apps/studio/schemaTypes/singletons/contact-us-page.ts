import {defineField, DocumentDefinition} from 'sanity'
import {DocumentIcon} from '@sanity/icons'
import {withSeo} from '../../helpers/document'

export const contactUsPage: DocumentDefinition = withSeo({
  name: 'contactUsPage',
  title: 'Contact Us Page',
  type: 'document',
  icon: DocumentIcon,
  preview: {
    prepare: () => ({
      title: 'Contact Us Page',
    }),
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'title for the Contact Us page',
    }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'Content',
      description: 'Content block for the landing section',
      of: [{type: 'block'}],
    }),
  ],
})

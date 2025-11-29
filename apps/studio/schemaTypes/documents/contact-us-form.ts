import {defineField, DocumentDefinition} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export const contactUsForm: DocumentDefinition = {
  name: 'contactUsForm',
  title: 'Contact Us Form Data',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Sender Name',
      type: 'string',
      readOnly: true,
      validation: (rule) => [rule.required()],
    }),
    defineField({
      name: 'email',
      title: 'Sender Name',
      type: 'string',
      readOnly: true,
      validation: (rule) => [rule.required()],
    }),
    defineField({
      name: 'phone',
      title: 'Sender Phone Number',
      type: 'string',
      readOnly: true,
      validation: (rule) => [rule.required()],
    }),
    defineField({
      name: 'message',
      title: 'Sender message',
      type: 'text',
      rows: 4,
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'string',
      readOnly: true,
      validation: (rule) => [rule.required()],
    }),
  ],
}

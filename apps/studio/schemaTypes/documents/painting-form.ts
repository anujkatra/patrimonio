import {defineField, DocumentDefinition} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export const paintingForm: DocumentDefinition = {
  name: 'paintingForm',
  title: 'Painting Form Data',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'paintingName',
      title: 'Painting Name',
      type: 'string',
      readOnly: true,
      validation: (rule) => [rule.required()],
    }),
    defineField({
      name: 'paintingSlug',
      title: 'Painting Name',
      type: 'string',
      readOnly: true,
      validation: (rule) => [rule.required()],
    }),
    defineField({
      name: 'name',
      title: 'Person Name',
      type: 'string',
      readOnly: true,
      validation: (rule) => [rule.required()],
    }),
    defineField({
      name: 'email',
      title: 'Person email',
      type: 'string',
      readOnly: true,
      validation: (rule) => [rule.required()],
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

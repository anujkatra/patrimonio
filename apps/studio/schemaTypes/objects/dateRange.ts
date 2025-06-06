import {defineField, ObjectDefinition} from 'sanity'
import {CalendarIcon} from '@sanity/icons'

export const dateRange: ObjectDefinition = {
  name: 'dateRange',
  title: 'Date Range',
  type: 'object',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      options: {
        dateFormat: 'DD-MM-YYYY',
      },
      validation: (rule) => rule.required().min('01-01-1940'),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      options: {
        dateFormat: 'DD-MM-YYYY',
      },
      validation: (rule) => rule.min(rule.valueOfField('startDate')),
    }),
  ],
}

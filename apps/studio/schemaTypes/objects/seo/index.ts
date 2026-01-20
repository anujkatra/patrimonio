import {ObjectDefinition} from 'sanity'

export const seo: ObjectDefinition = {
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    {
      name: 'image',
      title: 'SEO Share Image',
      type: 'image',
    },
    {
      name: 'title',
      title: 'SEO title',
      type: 'string',
      description: 'SEO Title should be between 30 and 60 characters.',
      validation: (Rule) =>
        Rule.min(30).max(60).warning('SEO Title should be between 30 and 60 characters.'),
    },
    {
      name: 'noTitleSuffix',
      title: 'Exclude title suffix?',
      description:
        'If checked, page title will be exactly field above. Otherwise default sitewide title suffix will be included after title above.',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'description',
      title: 'SEO description',
      type: 'text',
      description: 'SEO Descriptions should be between 70 and 160 characters.',
      validation: (Rule) =>
        Rule.min(70).max(160).warning('SEO Descriptions should be between 70 and 160 characters.'),
    },
    {type: 'opengraph', name: 'opengraph'},
    {type: 'twitter', name: 'twitter'},
    {type: 'robots', name: 'robots'},
  ],
}

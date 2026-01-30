import {defineField, DocumentDefinition} from 'sanity'
import {DocumentIcon} from '@sanity/icons'
import {FieldProps, useFormValue} from 'sanity'

function PaintingDescriptionLink(props: FieldProps) {
  const paintingSlug = useFormValue(['paintingSlug']) as string

  return (
    <div>
      {props.renderDefault(props)}
      {paintingSlug !== null && typeof paintingSlug === 'string' ? (
        <p>
          Link:{' '}
          <span>
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://patrimoniogallery.com/gallery/${paintingSlug}`}
            >
              https://patrimoniogallery.com/gallery/{paintingSlug}
            </a>
          </span>
        </p>
      ) : (
        <></>
      )}
    </div>
  )
}

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
      // readOnly: true,
      validation: (rule) => [rule.required()],
    }),
    defineField({
      name: 'paintingSlug',
      title: 'Painting Slug',
      type: 'string',
      // readOnly: true,
      validation: (rule) => [rule.required()],
      components: {
        field: PaintingDescriptionLink,
      },
    }),
    defineField({
      name: 'name',
      title: 'Person Name',
      type: 'string',
      // readOnly: true,
      validation: (rule) => [rule.required()],
    }),
    defineField({
      name: 'email',
      title: 'Person email',
      type: 'string',
      // readOnly: true,
      validation: (rule) => [rule.required()],
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'string',
      // readOnly: true,
      validation: (rule) => [rule.required()],
    }),
  ],
}

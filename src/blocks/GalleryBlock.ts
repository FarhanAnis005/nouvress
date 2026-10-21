import type { Block } from 'payload'

export const GalleryBlock: Block = {
  slug: 'galleryBlock',
  labels: {
    singular: 'Photo Essay / Gallery',
    plural: 'Photo Essays / Galleries',
  },
  fields: [
    {
      name: 'galleryTitle',
      type: 'text',
      label: 'Photo Essay / Gallery Subheading (Optional)',
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'stacked',
      options: [
        { label: 'Documentary Stacked (Large vertical sequence)', value: 'stacked' },
        { label: 'Two-Column Contact Sheet', value: 'two-column' },
      ],
      label: 'Display Layout',
    },
    {
      name: 'photos',
      type: 'array',
      required: true,
      minRows: 1,
      label: 'Photographs',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Photograph',
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Caption',
        },
        {
          name: 'credit',
          type: 'text',
          label: 'Photographer Credit',
        },
      ],
    },
  ],
}

import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  labels: {
    singular: 'Inline Photograph',
    plural: 'Inline Photographs',
  },
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Photograph',
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Caption (Optional override for this article)',
    },
    {
      name: 'photographerCredit',
      type: 'text',
      label: 'Photographer Credit (Optional override, e.g. "PHOTO: JANE DOE / STUDENT PRESS")',
    },
    {
      name: 'width',
      type: 'select',
      defaultValue: 'standard',
      options: [
        { label: 'Standard Column (matches text column)', value: 'standard' },
        { label: 'Wide Editorial (slightly wider than text)', value: 'wide' },
        { label: 'Full Width', value: 'full' },
      ],
      label: 'Display Width',
    },
  ],
}

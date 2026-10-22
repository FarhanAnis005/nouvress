import type { CollectionConfig } from 'payload'
import path from 'path'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['filename', 'alt', 'photographerCredit', 'createdAt'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  upload: {
    staticDir: path.resolve(process.cwd(), 'public/media'),
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alternative Text (Screen readers & Accessibility)',
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Default Caption',
    },
    {
      name: 'photographerCredit',
      type: 'text',
      label: 'Photographer / Contributor Credit (e.g. "Jane Doe / Student Press")',
    },
    {
      name: 'sourceRightsNote',
      type: 'text',
      label: 'Source / Rights Note',
    },
    {
      name: 'internalEditorialNotes',
      type: 'textarea',
      label: 'Internal Editorial Notes (Private - never shown on public website)',
      access: {
        read: ({ req: { user } }) => Boolean(user),
      },
      admin: {
        description: 'Private verification, contact, or licensing notes visible only to logged-in editors.',
      },
    },
  ],
}

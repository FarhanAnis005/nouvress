import type { CollectionConfig } from 'payload'

export const Authors: CollectionConfig = {
  slug: 'authors',
  admin: {
    useAsTitle: 'displayName',
    defaultColumns: ['displayName', 'isPseudonym', 'createdAt'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'displayName',
      type: 'text',
      required: true,
      label: 'Byline / Display Name',
    },
    {
      name: 'isPseudonym',
      type: 'checkbox',
      label: 'Pseudonymous Byline (Protects contributor privacy)',
      defaultValue: false,
      admin: {
        description: 'Check this if the author is writing under a pseudonym or collective handle to protect student privacy.',
      },
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Short Contributor Biography',
    },
    {
      name: 'profilePhoto',
      type: 'upload',
      relationTo: 'media',
      label: 'Profile Photo (Optional)',
    },
    {
      name: 'publicContact',
      type: 'text',
      label: 'Public Contact / Social Link (Optional, e.g. Bluesky or Fediverse)',
      admin: {
        description: 'Only enter public contact information. Never put private student email or phone numbers here.',
      },
    },
  ],
}

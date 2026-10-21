import type { CollectionConfig } from 'payload'
import {
  lexicalEditor,
  BlocksFeature,
  UploadFeature,
  HeadingFeature,
  LinkFeature,
  HorizontalRuleFeature,
  BlockquoteFeature,
  OrderedListFeature,
  UnorderedListFeature,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  ParagraphFeature,
} from '@payloadcms/richtext-lexical'
import { MediaBlock } from '../blocks/MediaBlock'
import { GalleryBlock } from '../blocks/GalleryBlock'
import { VideoBlock } from '../blocks/VideoBlock'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'publishedAt', '_status', 'updatedAt'],
    preview: (doc, { req }) => {
      if (doc?.slug) {
        return `/articles/${doc.slug}?preview=true`
      }
      return null
    },
  },
  versions: {
    drafts: {
      autosave: true,
    },
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => user?.role === 'admin' || Boolean(user),
  },
  hooks: {
    beforeChange: [
      ({ data, req, operation, originalDoc }) => {
        // If publishing and publishedAt is not yet set, set to current timestamp
        if (data._status === 'published') {
          if (!data.publishedAt && (!originalDoc || !originalDoc.publishedAt)) {
            data.publishedAt = new Date().toISOString()
          } else if (originalDoc?.publishedAt) {
            // Preserve the original published date on subsequent edits
            data.publishedAt = originalDoc.publishedAt
          }
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Headline',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'URL Slug',
      admin: {
        description: 'Permanent URL identifier (e.g. "student-protest-occupies-quad")',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return data.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle / Standfirst (Optional)',
      admin: {
        description: 'A 1-2 sentence lead paragraph shown directly under the headline.',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'authors',
      required: true,
      label: 'Author / Byline',
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      label: 'Categories',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured Image / Thumbnail (Optional)',
      admin: {
        description: 'Shown as a small thumbnail on the homepage and article listings.',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Original Publication Date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        description: 'Set automatically on first publication. Preserved when editing existing stories.',
      },
    },
    {
      name: 'seoDescription',
      type: 'textarea',
      label: 'Short Summary / Meta Description (Optional)',
      admin: {
        description: 'Brief summary for search engines and article listings.',
      },
    },
    {
      name: 'body',
      type: 'richText',
      label: 'Article Content',
      required: true,
      editor: lexicalEditor({
        features: () => [
          ParagraphFeature(),
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3'] }),
          BoldFeature(),
          ItalicFeature(),
          UnderlineFeature(),
          LinkFeature({}),
          BlockquoteFeature(),
          HorizontalRuleFeature(),
          OrderedListFeature(),
          UnorderedListFeature(),
          UploadFeature({
            collections: {
              media: {
                fields: [
                  {
                    name: 'caption',
                    type: 'text',
                    label: 'Caption',
                  },
                  {
                    name: 'photographerCredit',
                    type: 'text',
                    label: 'Photographer Credit',
                  },
                ],
              },
            },
          }),
          BlocksFeature({
            blocks: [MediaBlock, GalleryBlock, VideoBlock],
          }),
        ],
      }),
    },
  ],
}

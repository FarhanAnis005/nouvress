import type { Block } from 'payload'

export const VideoBlock: Block = {
  slug: 'videoBlock',
  labels: {
    singular: 'Embedded Video',
    plural: 'Embedded Videos',
  },
  fields: [
    {
      name: 'videoUrl',
      type: 'text',
      required: true,
      label: 'Video URL (YouTube or Vimeo)',
      validate: (value: any) => {
        if (!value) return 'A video URL is required.'
        const isYouTube = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/.test(value)
        const isVimeo = /(?:vimeo\.com\/)(\d+)/.test(value)
        if (!isYouTube && !isVimeo) {
          return 'Please enter a valid YouTube (e.g. https://www.youtube.com/watch?v=...) or Vimeo URL.'
        }
        return true
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Video Caption / Description',
    },
    {
      name: 'credit',
      type: 'text',
      label: 'Videographer / Source Credit',
    },
  ],
}

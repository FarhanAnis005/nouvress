import React from 'react'
import Image from 'next/image'

interface RichTextRendererProps {
  content: any
}

// Safely extract YouTube or Vimeo embed URLs
function getSafeEmbedUrl(url: string): string | null {
  if (!url) return null

  // YouTube match
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/)
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}`
  }

  // Vimeo match
  const vimeoMatch = url.match(/(?:vimeo\.com\/)(\d+)/)
  if (vimeoMatch && vimeoMatch[1]) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`
  }

  return null
}

export const RichTextRenderer: React.FC<RichTextRendererProps> = ({ content }) => {
  if (!content || !content.root || !Array.isArray(content.root.children)) {
    return null
  }

  const renderNode = (node: any, index: number): React.ReactNode => {
    if (!node) return null

    // Text node
    if (node.type === 'text') {
      let textElement: React.ReactNode = node.text

      // Bitmask for Lexical formatting: 1: bold, 2: italic, 8: underline, 16: code
      if (node.format & 1) {
        textElement = <strong>{textElement}</strong>
      }
      if (node.format & 2) {
        textElement = <em>{textElement}</em>
      }
      if (node.format & 8) {
        textElement = <u>{textElement}</u>
      }
      return <React.Fragment key={index}>{textElement}</React.Fragment>
    }

    // Link node
    if (node.type === 'link') {
      const url = node.fields?.url || node.url || '#'
      const newTab = node.fields?.newTab ? '_blank' : undefined
      return (
        <a key={index} href={url} target={newTab} rel={newTab ? 'noopener noreferrer' : undefined}>
          {node.children?.map((child: any, i: number) => renderNode(child, i))}
        </a>
      )
    }

    // Paragraph node
    if (node.type === 'paragraph') {
      // Avoid rendering empty paragraphs as large blank spaces
      if (!node.children || node.children.length === 0) {
        return <br key={index} />
      }
      return (
        <p key={index}>
          {node.children.map((child: any, i: number) => renderNode(child, i))}
        </p>
      )
    }

    // Heading node
    if (node.type === 'heading') {
      const Tag = node.tag || 'h2'
      return React.createElement(
        Tag,
        { key: index },
        node.children?.map((child: any, i: number) => renderNode(child, i))
      )
    }

    // Blockquote
    if (node.type === 'quote') {
      return (
        <blockquote key={index}>
          {node.children?.map((child: any, i: number) => renderNode(child, i))}
        </blockquote>
      )
    }

    // Horizontal Rule
    if (node.type === 'horizontalrule') {
      return <hr key={index} className="newspaper-rule" />
    }

    // Lists
    if (node.type === 'list') {
      const ListTag = node.listType === 'number' ? 'ol' : 'ul'
      return (
        <ListTag key={index}>
          {node.children?.map((child: any, i: number) => renderNode(child, i))}
        </ListTag>
      )
    }

    if (node.type === 'listitem') {
      return (
        <li key={index}>
          {node.children?.map((child: any, i: number) => renderNode(child, i))}
        </li>
      )
    }

    // Native Lexical Upload node
    if (node.type === 'upload') {
      const media = node.value
      if (!media || !media.url) return null

      const caption = node.fields?.caption || media.caption
      const credit = node.fields?.photographerCredit || media.photographerCredit

      return (
        <figure key={index} className="inline-figure">
          <Image
            src={media.url}
            alt={media.alt || 'Documentary photograph'}
            width={media.width || 800}
            height={media.height || 500}
            style={{ maxWidth: '100%', maxHeight: '520px', width: 'auto', height: 'auto', margin: '0 auto' }}
          />
          {(caption || credit) && (
            <figcaption className="figure-caption-box">
              {caption && <span>{caption}</span>}
              {credit && <span className="figure-credit">{credit}</span>}
            </figcaption>
          )}
        </figure>
      )
    }

    // Custom Blocks
    if (node.type === 'block') {
      const blockFields = node.fields || {}
      const blockType = blockFields.blockType

      // 1. Media Block
      if (blockType === 'mediaBlock') {
        const media = blockFields.media
        if (!media || !media.url) return null

        const caption = blockFields.caption || media.caption
        const credit = blockFields.photographerCredit || media.photographerCredit
        const isWide = blockFields.width === 'wide'
        const widthClass = isWide ? 'wide' : ''

        return (
          <figure key={index} className={`inline-figure ${widthClass}`}>
            <Image
              src={media.url}
              alt={media.alt || 'Documentary photograph'}
              width={media.width || 800}
              height={media.height || 500}
              style={{
                maxWidth: '100%',
                maxHeight: isWide ? '580px' : '520px',
                width: 'auto',
                height: 'auto',
                margin: '0 auto',
              }}
            />
            {(caption || credit) && (
              <figcaption className="figure-caption-box">
                {caption && <span>{caption}</span>}
                {credit && <span className="figure-credit">{credit}</span>}
              </figcaption>
            )}
          </figure>
        )
      }

      // 2. Gallery Block (Photo Essay)
      if (blockType === 'galleryBlock') {
        const photos = blockFields.photos || []
        const isGrid = blockFields.layout === 'two-column'
        const galleryClass = isGrid ? 'gallery-grid-2' : 'gallery-stacked'

        return (
          <section key={index} className="gallery-section">
            {blockFields.galleryTitle && (
              <h3 className="gallery-heading">{blockFields.galleryTitle}</h3>
            )}
            <div className={galleryClass}>
              {photos.map((item: any, pIndex: number) => {
                const img = item.image
                if (!img || !img.url) return null
                const cap = item.caption || img.caption
                const cr = item.credit || img.photographerCredit

                return (
                  <figure key={pIndex} className="inline-figure" style={{ margin: 0 }}>
                    <Image
                      src={img.url}
                      alt={img.alt || 'Photo essay frame'}
                      width={img.width || 700}
                      height={img.height || 450}
                      style={{ width: '100%', height: 'auto' }}
                    />
                    {(cap || cr) && (
                      <figcaption className="figure-caption-box">
                        {cap && <span>{cap}</span>}
                        {cr && <span className="figure-credit">{cr}</span>}
                      </figcaption>
                    )}
                  </figure>
                )
              })}
            </div>
          </section>
        )
      }

      // 3. Video Block
      if (blockType === 'videoBlock') {
        const embedUrl = getSafeEmbedUrl(blockFields.videoUrl)
        if (!embedUrl) return null

        return (
          <div key={index} className="video-container">
            <div className="video-wrapper">
              <iframe
                src={embedUrl}
                title={blockFields.caption || 'Documentary video footage'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            {(blockFields.caption || blockFields.credit) && (
              <div className="figure-caption-box">
                {blockFields.caption && <span>{blockFields.caption}</span>}
                {blockFields.credit && (
                  <span className="figure-credit">{blockFields.credit}</span>
                )}
              </div>
            )}
          </div>
        )
      }
    }

    return null
  }

  return (
    <div className="article-prose">
      {content.root.children.map((node: any, i: number) => renderNode(node, i))}
    </div>
  )
}

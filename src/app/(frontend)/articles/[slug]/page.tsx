import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { RichTextRenderer } from '@/components/RichTextRenderer'
import type { Metadata } from 'next'

interface ArticlePageProps {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{
    preview?: string
  }>
}

export const revalidate = 0

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection: 'articles',
      where: {
        slug: { equals: slug },
      },
      draft: true,
      limit: 1,
    })

    const article = res.docs[0]
    if (!article) return { title: 'Article Not Found — NOUVRES' }

    return {
      title: `${article.title} — NOUVRES`,
      description: article.seoDescription || article.subtitle || undefined,
    }
  } catch (e) {
    return { title: 'NOUVRES — Independent Student Journalism' }
  }
}

export default async function ArticlePage({ params, searchParams }: ArticlePageProps) {
  const { slug } = await params
  const { preview } = await searchParams
  const isPreview = preview === 'true'

  let article: any = null

  try {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection: 'articles',
      where: {
        slug: { equals: slug },
      },
      draft: isPreview,
      depth: 2,
      limit: 1,
    })

    article = res.docs[0]
  } catch (err) {
    console.error('Error fetching article:', err)
  }

  if (!article) {
    notFound()
  }

  // Double check public access: if not in preview mode and article is draft, return 404
  if (!isPreview && article._status !== 'published') {
    notFound()
  }

  const pubDate = article.publishedAt || article.createdAt
  const formattedPublished = pubDate
    ? new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(pubDate))
    : null

  const updatedDate = article.updatedAt
  const isEdited =
    pubDate && updatedDate && Math.abs(new Date(updatedDate).getTime() - new Date(pubDate).getTime()) > 60000

  const formattedUpdated = isEdited
    ? new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(updatedDate))
    : null

  const author = typeof article.author === 'object' ? article.author : null
  const authorName = author ? author.displayName : 'Staff Reporter'

  const featuredImg =
    typeof article.featuredImage === 'object' && article.featuredImage !== null
      ? article.featuredImage
      : null

  return (
    <article className="article-container">
      {isPreview && (
        <div style={{ backgroundColor: '#fff2a8', border: '1px solid #c9b037', padding: '8px 12px', marginBottom: '18px', fontSize: '14px', fontFamily: 'var(--font-sans)' }}>
          <strong>PREVIEW MODE:</strong> You are viewing an unpublished draft. This version is not visible to public readers.
        </div>
      )}

      <div style={{ marginBottom: '14px' }}>
        <Link href="/" style={{ fontSize: '13px', fontFamily: 'var(--font-sans)', textTransform: 'uppercase' }}>
          ← Back to Front Page
        </Link>
      </div>

      <header className="article-header">
        {Array.isArray(article.categories) && article.categories.length > 0 && (
          <div className="article-category-badge">
            {article.categories.map((cat: any, i: number) => {
              const name = typeof cat === 'object' ? cat.name : cat
              const catSlug = typeof cat === 'object' ? cat.slug : null
              return catSlug ? (
                <Link key={i} href={`/category/${catSlug}`} style={{ marginRight: '8px', color: '#555' }}>
                  {name}
                </Link>
              ) : (
                <span key={i} style={{ marginRight: '8px' }}>{name}</span>
              )
            })}
          </div>
        )}

        <h1 className="article-page-headline">{article.title}</h1>

        {article.subtitle && (
          <p className="article-page-standfirst">{article.subtitle}</p>
        )}

        <div className="article-meta-block">
          <div>
            Reported by <strong>{authorName}</strong>
            {author?.isPseudonym && <span style={{ fontStyle: 'italic', color: '#666' }}> (Pseudonymous byline)</span>}
          </div>
          {formattedPublished && <div>Published: {formattedPublished}</div>}
          {formattedUpdated && (
            <div className="article-updated-tag">
              Updated: {formattedUpdated}
            </div>
          )}
        </div>
      </header>

      {/* Featured Lead Photograph */}
      {featuredImg && featuredImg.url && (
        <figure className="featured-lead-figure">
          <Image
            src={featuredImg.url}
            alt={featuredImg.alt || article.title}
            width={featuredImg.width || 800}
            height={featuredImg.height || 500}
            priority
            style={{ maxWidth: '100%', maxHeight: '520px', width: 'auto', height: 'auto' }}
          />
          {(featuredImg.caption || featuredImg.photographerCredit) && (
            <figcaption className="figure-caption-box">
              {featuredImg.caption && <span>{featuredImg.caption}</span>}
              {featuredImg.photographerCredit && (
                <span className="figure-credit">{featuredImg.photographerCredit}</span>
              )}
            </figcaption>
          )}
        </figure>
      )}

      {/* Rich-Text Body with Inline Images, Captions, Credits, Galleries, and Videos */}
      <RichTextRenderer content={article.body} />

      <hr className="newspaper-rule-dotted" style={{ marginTop: '36px' }} />

      {/* Contributor Byline Box */}
      {author && (
        <div className="author-box">
          <div className="author-box-header">About the Contributor</div>
          <div className="author-box-name">{author.displayName}</div>
          {author.bio && <p className="author-box-bio">{author.bio}</p>}
          {author.publicContact && (
            <p style={{ marginTop: '6px', fontSize: '13px' }}>
              Public Dispatch Contact: <span>{author.publicContact}</span>
            </p>
          )}
        </div>
      )}

      <div style={{ marginTop: '28px', textAlign: 'center' }}>
        <Link href="/" style={{ fontSize: '14px', fontFamily: 'var(--font-sans)' }}>
          ← Return to Front Page
        </Link>
      </div>
    </article>
  )
}

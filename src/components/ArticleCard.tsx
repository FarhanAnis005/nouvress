import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

interface ArticleCardProps {
  article: {
    id: string | number
    title: string
    slug: string
    subtitle?: string | null
    seoDescription?: string | null
    publishedAt?: string | null
    createdAt?: string | null
    author?: any
    categories?: any[] | null
    featuredImage?: any
  }
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const dateStr = article.publishedAt || article.createdAt
  const formattedDate = dateStr
    ? new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(new Date(dateStr))
    : null

  const authorName =
    typeof article.author === 'object' && article.author !== null
      ? article.author.displayName
      : 'Staff Reporter'

  const categoryName =
    Array.isArray(article.categories) && article.categories.length > 0
      ? typeof article.categories[0] === 'object'
        ? article.categories[0].name
        : null
      : null

  const categorySlug =
    Array.isArray(article.categories) && article.categories.length > 0
      ? typeof article.categories[0] === 'object'
        ? article.categories[0].slug
        : null
      : null

  const featuredImgUrl =
    typeof article.featuredImage === 'object' && article.featuredImage?.url
      ? article.featuredImage.url
      : null

  const snippet = article.subtitle || article.seoDescription

  return (
    <article className="article-list-item">
      <div className="story-layout">
        {featuredImgUrl && (
          <div className="story-thumb">
            <Link href={`/articles/${article.slug}`}>
              <Image
                src={featuredImgUrl}
                alt={article.featuredImage?.alt || article.title}
                width={140}
                height={100}
                style={{ objectFit: 'cover' }}
              />
            </Link>
          </div>
        )}

        <div className="story-content">
          {categoryName && categorySlug && (
            <div className="story-category">
              <Link href={`/category/${categorySlug}`}>{categoryName}</Link>
            </div>
          )}

          <h2 className="story-headline">
            <Link href={`/articles/${article.slug}`}>{article.title}</Link>
          </h2>

          <div className="story-byline">
            By <strong>{authorName}</strong>
            {formattedDate && <> • <span>{formattedDate}</span></>}
          </div>

          {snippet && <p className="story-snippet">{snippet}</p>}
        </div>
      </div>
    </article>
  )
}

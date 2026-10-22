import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import React from 'react'
import { ArticleCard } from '@/components/ArticleCard'
import type { Metadata } from 'next'

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

export const revalidate = 0

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection: 'categories',
      where: {
        slug: { equals: slug },
      },
      limit: 1,
    })
    const category = res.docs[0]
    if (!category) return { title: 'Category — NOUVRES' }
    return {
      title: `${category.name} — NOUVRES Archive`,
      description: category.description || undefined,
    }
  } catch {
    return { title: 'Category Archive — NOUVRES' }
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  let category: any = null
  let articles: any[] = []

  try {
    const payload = await getPayload({ config })
    const catRes = await payload.find({
      collection: 'categories',
      where: {
        slug: { equals: slug },
      },
      limit: 1,
    })

    category = catRes.docs[0]
    if (!category) {
      notFound()
    }

    const artRes = await payload.find({
      collection: 'articles',
      where: {
        and: [
          { _status: { equals: 'published' } },
          { categories: { contains: category.id } },
        ],
      },
      sort: '-publishedAt',
      depth: 2,
      limit: 50,
    })

    articles = artRes.docs
  } catch (err) {
    console.error('Error fetching category stories:', err)
    notFound()
  }

  return (
    <div>
      <div style={{ marginBottom: '14px' }}>
        <Link href="/" style={{ fontSize: '13px', fontFamily: 'var(--font-sans)', textTransform: 'uppercase' }}>
          ← Back to Front Page
        </Link>
      </div>

      <header style={{ borderBottom: '2px solid var(--border-color)', paddingBottom: '12px', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>{category.name}</h1>
        {category.description && (
          <p style={{ fontStyle: 'italic', color: '#444', marginTop: '4px' }}>{category.description}</p>
        )}
      </header>

      {articles.length === 0 ? (
        <div style={{ padding: '30px 0', textAlign: 'center', fontStyle: 'italic', color: '#555555' }}>
          <p>No published articles currently filed under {category.name}.</p>
        </div>
      ) : (
        <div className="article-list">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  )
}

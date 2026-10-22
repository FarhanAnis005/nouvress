import { getPayload } from 'payload'
import config from '@payload-config'
import React from 'react'
import { ArticleCard } from '@/components/ArticleCard'

export const revalidate = 0 // Dynamic data fetching for fresh journalism updates

export default async function HomePage() {
  let articles: any[] = []

  try {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection: 'articles',
      where: {
        _status: {
          equals: 'published',
        },
      },
      sort: '-publishedAt',
      depth: 2,
      limit: 20,
    })
    articles = res.docs
  } catch (err) {
    console.error('Error fetching homepage articles:', err)
  }

  return (
    <div>
      <aside className="editor-notice">
        <strong>Editorial Dispatch:</strong>
        NOUVRES is an uncensored, independent student press project dedicated to original investigative reporting, student perspectives, documentary photography, and transparent campus coverage.
      </aside>

      <hr className="newspaper-rule" />

      <section aria-label="Latest Stories">
        <h2 style={{ fontSize: '18px', textTransform: 'uppercase', fontFamily: 'var(--font-sans)', letterSpacing: '1px', marginBottom: '16px' }}>
          Latest Dispatches &amp; Reports
        </h2>

        {articles.length === 0 ? (
          <div style={{ padding: '30px 0', textAlign: 'center', fontStyle: 'italic', color: '#555555' }}>
            <p>No articles published yet. Check back soon for initial reports.</p>
          </div>
        ) : (
          <div className="article-list">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

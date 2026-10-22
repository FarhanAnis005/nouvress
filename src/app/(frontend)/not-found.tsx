import React from 'react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ padding: '40px 0', textAlign: 'center' }}>
      <h1 style={{ fontSize: '28px', fontFamily: 'var(--font-serif)', marginBottom: '14px' }}>
        404 — Dispatch Not Found
      </h1>

      <p style={{ fontSize: '15px', color: '#555555', maxWidth: '480px', margin: '0 auto 24px auto', lineHeight: '1.6' }}>
        The article, category, or document you requested does not exist or has been moved in the newsroom archives.
      </p>

      <Link
        href="/"
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '13px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          padding: '8px 16px',
          backgroundColor: '#000000',
          color: '#ffffff',
          textDecoration: 'none',
          display: 'inline-block',
        }}
      >
        ← Return to Front Page
      </Link>
    </div>
  )
}

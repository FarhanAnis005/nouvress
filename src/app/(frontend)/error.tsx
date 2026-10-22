'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'

export default function FrontendError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Frontend error caught by boundary:', error)
  }, [error])

  return (
    <div style={{ padding: '40px 0', textAlign: 'center' }}>
      <aside className="editor-notice" style={{ textAlign: 'left', marginBottom: '24px' }}>
        <strong>Newsroom Dispatch Notice:</strong> The publication server temporarily encountered high traffic or a brief connection interruption.
      </aside>

      <h1 style={{ fontSize: '24px', fontFamily: 'var(--font-serif)', marginBottom: '14px' }}>
        Dispatch Temporarily Unavailable
      </h1>

      <p style={{ fontSize: '15px', color: '#555555', maxWidth: '500px', margin: '0 auto 24px auto', lineHeight: '1.6' }}>
        Our reporting desk is currently reconnecting to the archive database. You can try reloading this dispatch or return to the front page.
      </p>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <button
          onClick={() => reset()}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '13px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            padding: '8px 16px',
            backgroundColor: '#000000',
            color: '#ffffff',
            border: '1px solid #000000',
            cursor: 'pointer',
          }}
        >
          Reload Dispatch
        </button>

        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '13px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            padding: '8px 16px',
            backgroundColor: '#ffffff',
            color: '#000000',
            border: '1px solid #000000',
            textDecoration: 'none',
            display: 'inline-block',
          }}
        >
          Front Page
        </Link>
      </div>

      {error.digest && (
        <p style={{ marginTop: '28px', fontSize: '11px', color: '#888888', fontFamily: 'monospace' }}>
          Dispatch Ref: {error.digest}
        </p>
      )}
    </div>
  )
}

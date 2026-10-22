import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Policy on Corrections & Updates — NOUVRES',
  description: 'How factual corrections, clarifications, and story updates are handled by NOUVRES.',
}

export default function CorrectionsPage() {
  return (
    <div className="article-container">
      <div style={{ marginBottom: '14px' }}>
        <Link href="/" style={{ fontSize: '13px', fontFamily: 'var(--font-sans)', textTransform: 'uppercase' }}>
          ← Back to Front Page
        </Link>
      </div>

      <h1 className="page-title">Policy on Corrections &amp; Updates</h1>

      <div className="page-prose">
        <p>
          NOUVRES is committed to factual truth, documentary integrity, and transparent accountability. Fast-moving reporting on protests, campus actions, and university policy can occasionally result in errors or rapidly developing facts. We do not stealth-edit stories or bury factual mistakes.
        </p>

        <h2>Distinction Between Types of Edits</h2>

        <h3>1. Factual Corrections</h3>
        <p>
          If an article contains a factual error—such as an incorrect date, misspelled name, inaccurate crowd count, or erroneous quotation—the article is corrected promptly. An explicit italicized correction note will be appended to the top or bottom of the article specifying what was incorrect and when it was amended.
        </p>

        <h3>2. Substantial Developing Updates</h3>
        <p>
          When new events unfold following initial publication (for example, official university administration responses, arrests, or subsequent negotiations), the story is updated with a revised <em>Last Updated</em> timestamp. The original publication date is preserved to maintain the chronological record of events.
        </p>

        <h3>3. Minor Typographical Corrections</h3>
        <p>
          Minor spelling and formatting errors that do not alter the factual meaning of a sentence may be corrected without a formal note, but the system-managed timestamp will record the update.
        </p>

        <h2>Requesting a Correction</h2>
        <p>
          If you believe a published report contains a factual error, please reach out via our <Link href="/contact">Contact Page</Link> with the headline, URL, the specific passage in question, and documentation or evidence supporting the correction.
        </p>
      </div>
    </div>
  )
}

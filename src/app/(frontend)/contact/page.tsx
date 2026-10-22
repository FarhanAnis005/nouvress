import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact & Submissions — NOUVRES',
  description: 'Editorial contacts and submission guidelines for student contributors.',
}

export default function ContactPage() {
  const editorialContact = process.env.EDITORIAL_CONTACT || null

  return (
    <div className="article-container">
      <div style={{ marginBottom: '14px' }}>
        <Link href="/" style={{ fontSize: '13px', fontFamily: 'var(--font-sans)', textTransform: 'uppercase' }}>
          ← Back to Front Page
        </Link>
      </div>

      <h1 className="page-title">Editorial Contact &amp; Submissions</h1>

      <div className="page-prose">
        <p>
          NOUVRES welcomes story tips, documentary photography submissions, op-eds, and campus dispatches from students and campus workers.
        </p>

        <h2>Direct Editorial Contact</h2>
        {editorialContact ? (
          <p>
            You can reach the editorial desk directly at: <strong>{editorialContact}</strong>
          </p>
        ) : (
          <p>
            Editorial contact details will be posted here by the editors upon official dispatch. To configure or update the editorial contact method, editors can set the <code>EDITORIAL_CONTACT</code> environment variable in the site configuration.
          </p>
        )}

        <h2>Submitting Writing or Photography</h2>
        <p>
          When submitting original reporting, photographs, or audio/video footage:
        </p>
        <ul>
          <li>Indicate whether you wish to be credited under your legal name, a chosen pseudonym, or a collective student byline.</li>
          <li>Include the date, location, and brief context for any submitted photographs.</li>
          <li>Confirm that all submitted photographs were taken by you or that you have direct permission from the photographer.</li>
        </ul>

        <h2>Sensitive Information &amp; Anonymity</h2>
        <p>
          While our editorial staff will vigorously protect the identity of anonymous sources and pseudonymous contributors, standard web and email communications are not inherently secure. If your communication involves highly sensitive information or personal safety concerns, please contact the editors via an encrypted channel before transmitting confidential material.
        </p>
      </div>
    </div>
  )
}

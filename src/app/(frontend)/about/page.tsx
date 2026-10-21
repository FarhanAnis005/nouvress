import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About the Publication — NOUVRESS',
  description: 'Editorial mission, independence, and reporting principles of NOUVRESS.',
}

export default function AboutPage() {
  return (
    <div className="article-container">
      <div style={{ marginBottom: '14px' }}>
        <Link href="/" style={{ fontSize: '13px', fontFamily: 'var(--font-sans)', textTransform: 'uppercase' }}>
          ← Back to Front Page
        </Link>
      </div>

      <h1 className="page-title">About NOUVRESS</h1>

      <div className="page-prose">
        <p>
          <strong>NOUVRESS</strong> is an independent student journalism initiative created to document student movements, campus protests, direct actions, interviews, and grassroots perspectives.
        </p>

        <h2>Mission &amp; Purpose</h2>
        <p>
          Campus journalism is often restricted by university administration oversight, public relations concerns, or corporate media sensationalism. NOUVRESS was established to provide an independent, uncompromised public record of student life, assembly, dissent, and dialogue.
        </p>
        <p>
          We prioritise firsthand reporting from the ground: publishing original writing, documentary photography, and recorded speech directly from student organizers, eyewitnesses, and participants.
        </p>

        <h2>Editorial Principles</h2>
        <ul>
          <li><strong>Authentic Student Voice:</strong> We only publish original reporting, essays, photography, and analysis by students and participants. We do not use automated writing or AI-generated editorial content.</li>
          <li><strong>Protection of Contributor Privacy:</strong> Because student protesters and interviewees can face academic disciplinary actions or harassment, we support pseudonymous bylines and protect sensitive contributor identities.</li>
          <li><strong>Documentary Rigour:</strong> Photographs and recordings are presented with accurate dates, context, and photographer credits. We do not distort or stage documentary imagery.</li>
          <li><strong>Financial &amp; Institutional Independence:</strong> We accept no funding, sponsorship, or institutional oversight that grants editorial control to university authorities or commercial advertisers.</li>
        </ul>

        <h2>Corrections &amp; Updates</h2>
        <p>
          We are committed to factual accuracy and transparency. When substantial factual updates or corrections are made to a published story, we document them clearly with a timestamped notice. See our full <Link href="/corrections">Policy on Corrections</Link> for details.
        </p>
      </div>
    </div>
  )
}

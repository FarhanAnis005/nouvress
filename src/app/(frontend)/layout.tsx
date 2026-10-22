import React from 'react'
import type { Metadata } from 'next'
import './global.css'
import { Masthead } from '@/components/Masthead'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'NOUVRES — Independent Student Journalism',
  description: 'An independent student publication covering campus movements, protests, documentary photography & student perspectives.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
}

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body suppressHydrationWarning>
        <div className="paper-container">
          <Masthead />
          <main id="main-content">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

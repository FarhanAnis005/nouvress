import Link from 'next/link'
import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer className="newspaper-footer">
      <ul className="footer-nav">
        <li><Link href="/">Front Page</Link></li>
        <li><Link href="/about">About This Publication</Link></li>
        <li><Link href="/contact">Contact &amp; Submissions</Link></li>
        <li><Link href="/corrections">Policy on Corrections</Link></li>
        <li><Link href="/admin">Staff Dashboard</Link></li>
      </ul>

      <p className="footer-colophon">
        <strong>NOUVRESS</strong> is an independent student-run journalism initiative.<br />
        Produced entirely by students without institutional censorship, algorithmic tracking, or AI-generated editorial copy.<br />
        All original photographs, reporting, and contributor rights reserved by their respective student creators.
      </p>
    </footer>
  )
}

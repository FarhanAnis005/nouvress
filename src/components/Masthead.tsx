import Link from 'next/link'
import React from 'react'

export const Masthead: React.FC = () => {
  const today = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date())

  return (
    <header className="masthead-wrapper">
      <div className="masthead-top-bar">
        <span>Vol. I — No. 1</span>
        <span>{today}</span>
        <span>Independent & Free</span>
      </div>

      <h1 className="masthead-title">
        <Link href="/">NOUVRESS</Link>
      </h1>

      <p className="masthead-subtitle">
        An independent student publication covering campus movements, protests, documentary photography &amp; student perspectives.
      </p>

      <div className="masthead-bottom-bar">
        <nav aria-label="Main Navigation">
          <ul className="nav-links">
            <li><Link href="/">Front Page</Link></li>
            <li><Link href="/category/reporting">Reporting</Link></li>
            <li><Link href="/category/interviews">Interviews</Link></li>
            <li><Link href="/category/photo-essays">Photo Essays</Link></li>
            <li><Link href="/category/opinion">Opinion</Link></li>
            <li><Link href="/category/student-perspectives">Perspectives</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/corrections">Corrections</Link></li>
            <li><Link href="/admin">Editor Login</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

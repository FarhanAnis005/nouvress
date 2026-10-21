# NOUVRESS — Independent Student Journalism Website

A complete, deployable publication website covering student protests, campus movements, interviews, photo essays, and student perspectives.

Built with **Next.js 15+ (App Router)**, **TypeScript**, **Payload CMS 3.x**, and connected to **Supabase PostgreSQL**.

---

## 1. Quick Start

### Start Local Development Server
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) for the public site.
Open [http://localhost:3000/admin](http://localhost:3000/admin) for the Payload CMS admin panel.
Default credentials (configured in `.env` via `ADMIN_EMAIL` and `ADMIN_PASSWORD`):
- Email: `editor@nouvress.org`
- Password: `EditorPassword2026!`

### Run Automated Lifecycle Tests
```bash
npm run test:lifecycle
```

### Seed Demonstration Content
```bash
npm run seed
```

---

## 2. Technology Stack

- **Framework:** Next.js (App Router, TypeScript)
- **CMS:** Payload CMS 3.x (runs natively at `/admin`)
- **Rich-Text Editor:** `@payloadcms/richtext-lexical` with custom blocks:
  - Inline Photographs with Captions & Photographer Credits
  - Photo Essays / Multi-Image Galleries
  - Embedded Safe Videos (YouTube & Vimeo)
  - Horizontal Dividers & Blockquotes
- **Database:** Supabase PostgreSQL via `@payloadcms/db-postgres`
- **Design System:** Authentic 1990s newspaper aesthetic (Times New Roman serif body, `#0000EE` default links, narrow reading column, solid 1px rules)
- **Version Control:** Git

---

## 3. Deployment & Editorial Documentation

See the complete [Deployment & Editor's Manual](./deployment_and_editor_guide.md) for:
- Step-by-step editorial workflow for Tasia (writing, formatting, inline photos, photo essays, saving drafts, and publishing)
- Vercel production hosting setup
- 1984 Hosting DNS configuration
- Supabase backup and recovery procedures

# 📰 NOUVRESS — Independent Student Journalism
### *The Complete Handbook & Guide for Writers, Photographers, and Editors*

Welcome to **NOUVRESS**, an independent student-run publication dedicated to documentary journalism, campus protests, in-depth interviews, photo essays, and student movements.

This website was purpose-built so that student journalists can write, edit, upload photography, and publish stories with **zero technical or coding knowledge**. The writing dashboard looks and feels just like working in Microsoft Word or Google Docs.

---

## 📑 Table of Contents

1. [At a Glance: What is NOUVRESS?](#1-at-a-glance-what-is-nouvress)
2. [Starting the Website on Your Computer (Quick Start)](#2-starting-the-website-on-your-computer-quick-start)
3. [How to Log In to the Newsroom Dashboard](#3-how-to-log-in-to-the-newsroom-dashboard)
4. [Writing & Publishing a Story (Step-by-Step)](#4-writing--publishing-a-story-step-by-step)
   - [Starting a New Story](#step-1-starting-a-new-story)
   - [Adding the Lead Photo (Featured Image)](#step-2-adding-the-lead-photo)
   - [Writing Your Body Text & Quotes](#step-3-writing-your-body-text--quotes)
   - [Adding Photos Between Paragraphs](#step-4-adding-photos-between-paragraphs)
   - [Creating a Photo Essay or Gallery](#step-5-creating-a-photo-essay-or-gallery)
   - [Embedding Video Footage](#step-6-embedding-video-footage)
5. [Saving Drafts, Previewing, and Hitting Publish](#5-saving-drafts-previewing-and-hitting-publish)
6. [Updating a Story After It's Published](#6-updating-a-story-after-its-published)
7. [Protecting Student Reporters (Pseudonyms & Safety)](#7-protecting-student-reporters-pseudonyms--safety)
8. [Managing Your Newsroom Team (Writers & Editors)](#8-managing-your-newsroom-team-writers--editors)
9. [Handling Corrections Transparently](#9-handling-corrections-transparently)
10. [Where Your Words & Photos Are Stored (The Cloud)](#10-where-your-words--photos-are-stored-the-cloud)
11. [How the Website Goes Live to the Public (Hosting)](#11-how-the-website-goes-live-to-the-public-hosting)
12. [Frequently Asked Questions & Troubleshooting (FAQ)](#12-frequently-asked-questions--troubleshooting-faq)

---

## 1. At a Glance: What is NOUVRESS?

- **Early-Web / 1990s Newspaper Aesthetic:** The website intentionally uses a stark, high-contrast, early-web news design (clean white background, classic serif reading typography, underlined blue links, and focused reading columns). There are no flashing ads, no popups, and no distracting animations—putting student writing and documentary photography first.
- **Strictly Student-Produced:** We report on real events with eyewitness reporting. We never publish synthetic or AI-generated journalism.
- **Privacy First:** We take student safety seriously. Writers and photographers covering sensitive campus actions can easily publish under pseudonyms with one click.
- **Independent & Free:** The publication runs entirely on open, reliable cloud services without costly subscriptions.

---

## 2. Starting the Website on Your Computer (Quick Start)

If you are running the website locally on your laptop:

1. **Open your Terminal application:**
   - **Mac:** Press `Command + Space`, type `Terminal`, and hit `Enter`.
   - **Windows:** Search for `PowerShell` or `Command Prompt` in the Start menu.
2. **Move into the project folder:**
   ```bash
   cd path/to/nouvress
   ```
3. **Start the site:**
   ```bash
   npm run dev
   ```
4. **Open your web browser** (Safari, Chrome, Firefox, or Edge) and visit:
   - **Public News Website:** [http://localhost:3000](http://localhost:3000)
   - **Staff Writing Dashboard:** [http://localhost:3000/admin](http://localhost:3000/admin)

> 💡 **Keep Terminal Open:** As long as that Terminal window is open, your local website is live. When you are done working, press `Control + C` in the Terminal to turn it off.

---

## 3. How to Log In to the Newsroom Dashboard

To keep the public front page clean and focused on news, **there is no public "Login" button** on the website. Readers only see stories.

To access the staff writing room:

1. Open your web browser.
2. In the address bar at the very top, type:
   - **When working on your computer:** `http://localhost:3000/admin`
   - **When the site is live on the internet:** `https://yourdomain.org/admin`
3. Enter your staff email and password.
4. Click **Log In**.

| Staff Account Details | Default Setting | Note |
| :--- | :--- | :--- |
| **Email** | `editor@nouvress.org` | Can be customized in your staff settings |
| **Password** | `EditorPassword2026!` | You can change your password anytime under **Account** |

---

## 4. Writing & Publishing a Story (Step-by-Step)

### Step 1: Starting a New Story
1. In the left navigation menu of the dashboard, click **Articles**.
2. Click the **Create New** button in the top right corner.
3. Fill in the top fields:
   - **Headline (Required):** The title of your article (e.g., *"Students Hold 36-Hour Teach-In on Quad"*).
   - **URL Slug:** This is the web address ending for your article (e.g., `students-teach-in-quad`). It fills in automatically as you type your headline, but you can tweak it if you like.
   - **Subtitle / Standfirst (Optional):** A 1–2 sentence summary that appears in elegant italics directly beneath the headline.
   - **Author / Byline (Required):** Select the reporter who wrote the story from the dropdown. *(To add a new reporter, see Section 8).*
   - **Categories:** Check one or more categories (*Reporting*, *Interviews*, *Photo Essays*, *Opinion*, *Student Perspectives*).

---

### Step 2: Adding the Lead Photo (Featured Image)
Right below the categories, you will see the **Featured Image / Thumbnail** box.

1. Click **Choose existing** or **Upload new**.
2. Drag and drop your photograph into the window.
3. **Alt Text (Required):** Describe what is in the photo for visually impaired readers (e.g., *"Students holding handmade banners outside the administration building"*).
4. **Caption (Optional):** Context about the moment captured.
5. **Photographer Credit:** (e.g., `PHOTO: ELENA ROSTOVA / NOUVRESS`).

> 📸 **Photo Sizing Made Easy:** You do not need to worry about manually resizing or cropping pictures! The website automatically fits landscape and tall portrait photos cleanly so they never stretch, distort, or push the text off the screen.

---

### Step 3: Writing Your Body Text & Quotes
Scroll down to the **Article Content** box. You can write your story directly here, or copy and paste it from Google Docs or Word.

- **Paragraphs:** Just press `Enter` to start a new paragraph.
- **Bold & Italics:** Highlight any text and click the **B** or *I* icon on the floating toolbar.
- **Section Headings:** Highlight text and select **Heading 2** or **Heading 3** to break long investigations into readable chapters.
- **Pull Quotes & Blockquotes:** Highlight a student quote and click the quotation mark icon (`"`) to turn it into an indented, elegant newspaper quote block.
- **Bulleted / Numbered Lists:** Use the list buttons on the toolbar for student demands, timelines, or meeting agendas.

---

### Step 4: Adding Photos Between Paragraphs
You are never limited to just one top photo. You can drop photographs anywhere between paragraphs:

1. Press `Enter` to create a blank line between two paragraphs.
2. Click the **+** (plus icon) that appears on the toolbar.
3. Select **Inline Photograph**.
4. Upload or choose your photo.
5. Enter the **Caption** and **Photographer Credit**.
6. Choose the **Display Width**:
   - **Standard Column:** Matches the exact width of your written text.
   - **Wide Editorial:** Stretches slightly wider than the text for dramatic, expansive shots.
7. Click below the photo to continue writing your next paragraph.

---

### Step 5: Creating a Photo Essay or Gallery
For visual-first reporting, protest galleries, or campus art exhibitions:

1. On a blank line, click the **+** (plus icon) and select **Photo Essay / Gallery**.
2. Type an optional **Gallery Title** (e.g., *"Faces of the Movement: Autumn 2026"*).
3. Add as many photographs as you want. Each photo can have its own individual caption and credit.
4. Pick your layout style:
   - **Documentary Stacked:** Displays large, high-impact photos one after another down the page.
   - **Two-Column Contact Sheet:** Places images side-by-side in a classic 2-column newspaper grid.

---

### Step 6: Embedding Video Footage
If your reporters captured video of speeches, rallies, or press conferences:

1. On a blank line, click the **+** (plus icon) and choose **Embedded Video**.
2. Paste the public web link to the video from **YouTube** or **Vimeo** (e.g., `https://www.youtube.com/watch?v=...`).
3. Add an optional caption and videographer credit.
4. The website creates a clean, responsive video box that works smoothly on both smartphones and desktop screens without tracking readers.

---

## 5. Saving Drafts, Previewing, and Hitting Publish

At the bottom of your screen, you will see your control buttons:

### Saving a Private Draft
- Click **Save Draft** at any time.
- **Drafts are 100% invisible to the public:** Readers, visitors, and search engines cannot see them. Even if someone guesses the URL, the website displays a standard "Page Not Found" screen to anyone who is not an editor.

### Previewing How It Looks
- Click the **Preview** button in the top menu.
- A new tab will open showing you **exactly** how your story will look on the live website.
- A discreet banner at the top confirms you are previewing a private draft.

### Publishing Live
- When your story has been fact-checked and copy-edited, click the green **Publish** button.
- Your story goes live immediately:
  - It appears at the very top of the **Front Page**.
  - It appears in its respective **Category archive**.
  - The publication date and time are stamped into the official record.

---

## 6. Updating a Story After It's Published

Breaking news often evolves throughout the day as university officials respond or new facts emerge.

### Making Updates
1. Open the article in the dashboard, make your additions or edits, and click **Save**.
2. **The Original Breaking Date is Protected:** The date the story first broke is never overwritten or lost.
3. **Automatic "Updated" Stamp:** The website automatically detects your edit and adds a clear notice below the byline:  
   *`Published: 21 October 2026 — Updated: 22 October 2026, 14:30`*  
   This ensures complete transparency with your readers.

---

## 7. Protecting Student Reporters (Pseudonyms & Safety)

Student journalists often cover contentious protests, labor strikes, or administrative investigations where reporting under their legal name could expose them to disciplinary retaliation, doxxing, or employer blacklisting.

NOUVRESS includes a built-in safety shield:

1. In the dashboard left menu, click **Authors**.
2. Click **Create New** (or edit an existing reporter).
3. In the **Name** field, enter their chosen pen name or collective name (e.g., *"Campus Labor Watch"* or *"A. Finch"*).
4. Check the box labeled:  
   ☑️ **"Pseudonymous Byline (Protects contributor privacy)"**
5. Click **Save**.

### How This Appears to the Public
On the published story, their pen name will be displayed alongside a discreet, respectful note indicating that the byline is pseudonymous to protect contributor safety. **Their real email address, identity, and staff account details are completely hidden and never sent to the browser.**

---

## 8. Managing Your Newsroom Team (Writers & Editors)

Your dashboard separates **Writers (Authors)** from **Website Staff (Users)**:

### Adding a Reporter (Authors)
*Authors are the names that appear on bylines.*
1. Click **Authors** in the left menu.
2. Click **Create New**.
3. Enter their name, a short 1–2 sentence bio, and an optional portrait photo.
4. Now, whenever an editor writes or publishes an article, that reporter's name will appear in the Author dropdown list.

### Adding an Editor or Staff Member (Users)
*Users are the people who have login accounts to access the dashboard.*
1. Click **Users** in the left menu.
2. Click **Create New**.
3. Enter their email address, choose a secure password, and select their role:
   - **Editor:** Can write, edit, upload photos, and publish stories.
   - **Admin:** Can also create new staff accounts and change site-wide settings.
4. Click **Save**. Give that staff member their login credentials so they can access the dashboard.

---

## 9. Handling Corrections Transparently

Trust is the single most valuable asset of an independent student newspaper. NOUVRESS never "stealth-edits" or quietly deletes mistakes.

If an article contains an inaccurate name, misspelled title, or incorrect fact:

1. Open the article in the dashboard and correct the error in the body text.
2. At the very bottom of the article, add an italicized correction paragraph:
   > *Correction (22 October 2026): An earlier version of this article misstated the room number of the student assembly. The meeting was held in Room 204, not Room 104.*
3. Click **Save**.
4. Readers can also review our standing guidelines anytime on the public **[Corrections Policy](/corrections)** page.

---

## 10. Where Your Words & Photos Are Stored (The Cloud)

You never have to worry about losing your articles or photographs if someone's laptop breaks or gets lost:

| Content Type | Where It Lives | What It Means for You |
| :--- | :--- | :--- |
| **Articles, Bylines, & Categories** | **Supabase PostgreSQL Cloud Database** | All written text, author profiles, and revision histories are safely stored in an encrypted cloud database. |
| **Photographs & Images** | **Supabase Cloud Storage Vault** (`bucket`) | All uploaded photographs are stored in an independent, permanent cloud vault. They stay safe even if the server restarts. |

---

## 11. How the Website Goes Live to the Public (Hosting)

When you are ready to connect NOUVRESS to your real web address:

1. **The Website Host (Vercel):** The site runs on **Vercel** (on their free plan). Vercel connects to your private GitHub repository and automatically deploys the website in seconds whenever updates are pushed.
2. **Your Web Address (1984 Hosting):** Your domain name (e.g., `nouvress.org`) is managed through your domain provider (**1984 Hosting**). In the DNS settings of your 1984 account:
   - Set an **A Record** pointing `@` to `76.76.21.21`
   - Set a **CNAME Record** pointing `www` to `cname.vercel-dns.com.`
3. **Free Automatic Security (SSL):** Vercel automatically creates and renews the security certificate (the green padlock in the web browser) so reader connections are always encrypted.

*(For full step-by-step technical deployment instructions, see the companion guide in `deployment_and_editor_guide.md`).*

---

## 12. Frequently Asked Questions & Troubleshooting (FAQ)

### Q: Why isn't there a "Login" link on the home page?
> **Answer:** This is by design! Having no public login link keeps the front page looking like a genuine, uncluttered early-web newspaper, and prevents automated bots from finding your login page. Editors simply go directly to `/admin` in their browser address bar.

### Q: I hit "Save Draft", why isn't my story showing on the front page?
> **Answer:** Drafts are strictly private to editors! When you are ready for everyone to read your story, open the article and click the green **Publish** button at the bottom of the screen.

### Q: Do I need to shrink or crop photos from my camera before uploading?
> **Answer:** No! You can upload full-resolution photos straight from your camera or phone. The website automatically limits vertical and horizontal dimensions so your photos look crisp, proportional, and balanced on both desktop computers and mobile devices.

### Q: Can readers or university administrators see who uploaded an image or see an editor's personal email?
> **Answer:** No. Staff account emails and internal editorial notes are private and protected by the server. Only the photographer credit and caption you choose to type are visible to readers.

### Q: How do I change my login password?
> **Answer:** Log in to `/admin`, look at the bottom of the left sidebar, and click **Account**. Enter your new password and click **Save**.

### Q: How do I delete an article or unpublish it?
> **Answer:** Open the article in the dashboard. At the bottom, click the **Options** menu (or **Delete**) to remove it or change its status back from "Published" to "Draft".

---

## 🤝 Need Editorial or Technical Support?

- **Editorial Questions & Story Pitches:** Contact the editorial board via the [Contact Page](/contact).
- **Technical Guides & Server Documentation:** Detailed technical architecture, backup procedures, and server keys are documented in [`deployment_and_editor_guide.md`](./deployment_and_editor_guide.md).

*NOUVRESS — Free, Independent, Student-Run Press.*

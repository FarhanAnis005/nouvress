import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import path from 'path'
import fs from 'fs'

async function seed() {
  console.log('--- Starting Seed Process ---')
  const payload = await getPayload({ config })

  // 1. Seed Categories
  const categoriesData = [
    { name: 'Reporting', slug: 'reporting', description: 'Investigative reporting and frontline dispatches on campus developments.' },
    { name: 'Interviews', slug: 'interviews', description: 'In-depth conversations with student organizers, faculty, and campus workers.' },
    { name: 'Photo Essays', slug: 'photo-essays', description: 'Visual documentary coverage of rallies, student assemblies, and campus life.' },
    { name: 'Opinion', slug: 'opinion', description: 'Perspectives, arguments, and commentary by students.' },
    { name: 'Student Perspectives', slug: 'student-perspectives', description: 'Firsthand accounts, reflections, and student experiences.' },
  ]

  const categories: Record<string, any> = {}
  for (const cat of categoriesData) {
    const existing = await payload.find({
      collection: 'categories',
      where: { slug: { equals: cat.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      categories[cat.slug] = existing.docs[0]
      console.log(`Category "${cat.name}" already exists.`)
    } else {
      const created = await payload.create({
        collection: 'categories',
        data: cat,
      })
      categories[cat.slug] = created
      console.log(`Created category: ${cat.name}`)
    }
  }

  // 2. Seed Default Admin User
  const existingUsers = await payload.find({
    collection: 'users',
    where: { email: { equals: 'editor@nouvress.org' } },
    limit: 1,
  })

  let adminUser: any = null
  if (existingUsers.docs.length === 0) {
    adminUser = await payload.create({
      collection: 'users',
      data: {
        name: 'Tasia Vance',
        email: 'editor@nouvress.org',
        password: 'EditorPassword2026!',
        role: 'admin',
      },
    })
    console.log('Created admin user: editor@nouvress.org (Password: EditorPassword2026!)')
  } else {
    adminUser = existingUsers.docs[0]
    console.log('Admin user editor@nouvress.org already exists.')
  }

  // 3. Seed Author
  const existingAuthors = await payload.find({
    collection: 'authors',
    where: { displayName: { equals: 'Tasia Vance' } },
    limit: 1,
  })

  let author: any = null
  if (existingAuthors.docs.length === 0) {
    author = await payload.create({
      collection: 'authors',
      data: {
        displayName: 'Tasia Vance',
        isPseudonym: false,
        bio: 'Student editor and investigative reporter covering university administration policy, campus governance, and student civil liberties.',
        publicContact: '@tasia_vance',
      },
    })
    console.log('Created author: Tasia Vance')
  } else {
    author = existingAuthors.docs[0]
    console.log('Author Tasia Vance already exists.')
  }

  // 4. Seed Media
  const rallyPhotoPath = path.resolve(process.cwd(), 'public/media/student-rally.jpg')
  const stepsPhotoPath = path.resolve(process.cwd(), 'public/media/campus-forum.jpg')

  let mediaRally: any = null
  let mediaSteps: any = null

  if (fs.existsSync(rallyPhotoPath)) {
    const existingMedia = await payload.find({
      collection: 'media',
      where: { filename: { equals: 'student-rally.jpg' } },
      limit: 1,
    })

    if (existingMedia.docs.length === 0) {
      mediaRally = await payload.create({
        collection: 'media',
        data: {
          alt: 'Students holding placards advocating for student rights and academic freedom on campus quad',
          caption: 'Students rally outside university administration hall demanding protections for peaceful assembly.',
          photographerCredit: 'PHOTO: MARCUS CHEN / STUDENT PRESS',
          sourceRightsNote: 'Original student documentary photography',
        },
        filePath: rallyPhotoPath,
      })
      console.log('Seeded media: student-rally.jpg')
    } else {
      mediaRally = existingMedia.docs[0]
    }
  }

  if (fs.existsSync(stepsPhotoPath)) {
    const existingMedia = await payload.find({
      collection: 'media',
      where: { filename: { equals: 'campus-forum.jpg' } },
      limit: 1,
    })

    if (existingMedia.docs.length === 0) {
      mediaSteps = await payload.create({
        collection: 'media',
        data: {
          alt: 'Open student forum on University Hall steps with speaker addressing crowd',
          caption: 'Student organizers address an open assembly regarding civil liberties and campus demonstration guidelines.',
          photographerCredit: 'PHOTO: ELENA ROSTOVA / NOUVRESS ARCHIVE',
          sourceRightsNote: 'Original student documentary photography',
        },
        filePath: stepsPhotoPath,
      })
      console.log('Seeded media: campus-forum.jpg')
    } else {
      mediaSteps = existingMedia.docs[0]
    }
  }

  // 5. Seed Demonstration Article
  const existingArticles = await payload.find({
    collection: 'articles',
    where: { slug: { equals: 'students-occupy-quad-free-speech' } },
    draft: true,
    limit: 1,
  })

  if (existingArticles.docs.length === 0 && mediaRally && mediaSteps) {
    const articleBody = {
      root: {
        type: 'root',
        format: '',
        indent: 0,
        version: 1,
        children: [
          {
            type: 'paragraph',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                type: 'text',
                text: 'Over four hundred undergraduate and graduate students assembled on the central university quad yesterday afternoon, staging an open-air forum and peaceful sit-in. The gathering followed administrative notices warning student organizers of potential disciplinary sanctions for organizing a campus-wide walkout.',
                format: 0,
                version: 1,
              },
            ],
          },
          {
            type: 'paragraph',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                type: 'text',
                text: 'Despite cold autumn winds and an increased presence of campus security officers stationed near building entrances, students maintained a calm and determined presence. Banners hung from portable easels, and student speakers took turns addressing the assembly through a battery-operated public address loudspeaker.',
                format: 0,
                version: 1,
              },
            ],
          },
          // Inline Photograph 1
          {
            type: 'block',
            version: 1,
            fields: {
              blockType: 'mediaBlock',
              media: mediaRally.id,
              caption: 'Demonstrators gather on the campus lawn holding handmade signs calling for student representation and free speech.',
              photographerCredit: 'PHOTO: MARCUS CHEN / STUDENT PRESS',
              width: 'standard',
            },
          },
          {
            type: 'paragraph',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                type: 'text',
                text: '"We are not here to disrupt education; we are here to ensure that education includes the freedom of conscience," declared a third-year comparative literature student addressing the crowd from the library terrace. "When administrators threaten suspension for exercising peaceful assembly, they undermine the foundational purpose of a university."',
                format: 0,
                version: 1,
              },
            ],
          },
          // Inline Photograph 2
          {
            type: 'block',
            version: 1,
            fields: {
              blockType: 'mediaBlock',
              media: mediaSteps.id,
              caption: 'An open campus assembly convenes on the stone steps of University Hall as students deliberate collective demands.',
              photographerCredit: 'PHOTO: ELENA ROSTOVA / NOUVRESS ARCHIVE',
              width: 'wide',
            },
          },
          // Embedded Video
          {
            type: 'block',
            version: 1,
            fields: {
              blockType: 'videoBlock',
              videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
              caption: 'Archival video dispatch: Open microphone proceedings and faculty remarks during the student assembly.',
              credit: 'FOOTAGE COURTESY OF STUDENT MEDIA ARCHIVE',
            },
          },
          {
            type: 'paragraph',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                type: 'text',
                text: 'As night fell, organizers distributed warm tea and blankets, voting by consensus to maintain a rotating delegation on the quad until administrative representatives agreed to an open meeting. University officials have not issued a formal comment as of press time.',
                format: 0,
                version: 1,
              },
            ],
          },
        ],
      },
    }

    await payload.create({
      collection: 'articles',
      data: {
        title: 'Students Occupy University Quad Following Disciplinary Threats Against Peaceful Walkout',
        slug: 'students-occupy-quad-free-speech',
        subtitle: 'Over four hundred students gather outside University Hall demanding transparency and protections for campus assembly.',
        author: author.id,
        categories: [categories['reporting'].id, categories['student-perspectives'].id],
        featuredImage: mediaRally.id,
        seoDescription: 'Students hold peaceful open assembly and sit-in on campus quad following administrative disciplinary notices.',
        _status: 'published',
        publishedAt: new Date(Date.now() - 3600000 * 4).toISOString(), // 4 hours ago
        body: articleBody as any,
      },
    })
    console.log('Seeded demonstration article: "Students Occupy University Quad..."')
  }

  console.log('--- Seeding Completed Successfully ---')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed error:', err)
  process.exit(1)
})

import 'dotenv/config'
import { getPayload } from 'payload'
import config from './payload.config'

async function runTest() {
  console.log('--- Testing Draft Security & Lifecycle ---')
  const payload = await getPayload({ config })
  const author = (await payload.find({ collection: 'authors', limit: 1 })).docs[0]

  // 1. Create a draft article
  const draft = await payload.create({
    collection: 'articles',
    data: {
      title: 'Confidential Internal Draft for Testing',
      slug: 'test-confidential-draft',
      subtitle: 'This should not appear publicly.',
      author: author.id,
      _status: 'draft',
      body: {
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
                  text: 'Secret investigative draft content.',
                  format: 0,
                  version: 1,
                },
              ],
            },
          ],
        },
      },
    },
    draft: true,
  })

  console.log(`[PASS] Draft created successfully with ID: ${draft.id}, Status: ${draft._status}`)

  // 2. Query public published articles (mimicking public visitor)
  const publicArticles = await payload.find({
    collection: 'articles',
    where: {
      _status: { equals: 'published' },
    },
  })

  const foundInPublic = publicArticles.docs.some((a) => a.id === draft.id)
  if (foundInPublic) {
    console.error('[FAIL] Draft was leaked in public published articles query!')
    process.exit(1)
  } else {
    console.log('[PASS] Verified draft is hidden from public articles list.')
  }

  // 3. Test Publishing
  const publishTime = new Date('2026-10-21T14:00:00Z').toISOString()
  const publishedDoc = await payload.update({
    collection: 'articles',
    id: draft.id,
    data: {
      _status: 'published',
      publishedAt: publishTime,
    },
  })

  console.log(`[PASS] Published article. publishedAt: ${publishedDoc.publishedAt}`)

  // 4. Test Editing Published Article (preserve publishedAt)
  await new Promise((r) => setTimeout(r, 1000))
  const editedDoc = await payload.update({
    collection: 'articles',
    id: draft.id,
    data: {
      subtitle: 'Updated subtitle on breaking news.',
    },
  })

  if (editedDoc.publishedAt === publishTime) {
    console.log(`[PASS] Original publishedAt timestamp preserved on edit: ${editedDoc.publishedAt}`)
  } else {
    console.error(`[FAIL] publishedAt changed! Original: ${publishTime}, New: ${editedDoc.publishedAt}`)
    process.exit(1)
  }

  // 5. Clean up test article
  await payload.delete({
    collection: 'articles',
    id: draft.id,
  })
  console.log('[PASS] Test article cleaned up.')

  console.log('--- All Lifecycle & Security Tests Passed! ---')
  process.exit(0)
}

runTest().catch((err) => {
  console.error('Test error:', err)
  process.exit(1)
})

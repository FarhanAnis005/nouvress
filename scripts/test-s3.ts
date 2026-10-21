import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import path from 'path'
import fs from 'fs'

async function testUpload() {
  console.log('--- Testing Supabase S3 Storage Upload ---')
  console.log('S3_BUCKET:', process.env.S3_BUCKET)
  console.log('S3_ENDPOINT:', process.env.S3_ENDPOINT)
  console.log('S3_REGION:', process.env.S3_REGION)

  const payload = await getPayload({ config })

  // Use student-rally.jpg or a test buffer
  const samplePhoto = path.resolve(process.cwd(), 'public/media/student-rally.jpg')

  try {
    const uploadedMedia = await payload.create({
      collection: 'media',
      data: {
        alt: 'Supabase S3 Bucket Test Upload',
        caption: 'Verifying automated Supabase storage connection',
        photographerCredit: 'NOUVRESS SYSTEM TEST',
      },
      filePath: samplePhoto,
    })

    console.log('[SUCCESS] Media uploaded to Supabase Bucket!')
    console.log('Media ID:', uploadedMedia.id)
    console.log('Filename:', uploadedMedia.filename)
    console.log('URL:', uploadedMedia.url)

    // Clean up test upload
    await payload.delete({
      collection: 'media',
      id: uploadedMedia.id,
    })
    console.log('[SUCCESS] Test media cleanly removed.')
    console.log('--- Supabase S3 Storage is 100% Operational! ---')
    process.exit(0)
  } catch (err) {
    console.error('[ERROR] Failed to upload to Supabase bucket:', err)
    process.exit(1)
  }
}

testUpload()

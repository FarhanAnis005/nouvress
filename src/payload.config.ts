import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Authors } from './collections/Authors'
import { Categories } from './collections/Categories'
import { Articles } from './collections/Articles'
import sharp from 'sharp'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { s3Storage } from '@payloadcms/storage-s3'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

function resolvePostgresUrl(rawUrl: string): string {
  if (!rawUrl) return rawUrl
  try {
    const parsed = new URL(rawUrl)
    // Direct Supabase hostname (db.<project-ref>.supabase.co) resolves to IPv6-only,
    // which causes 'getaddrinfo ENOTFOUND' on serverless platforms (Vercel / AWS Lambda).
    // Automatically rewrite to Supabase's IPv4 connection pooler in Transaction Mode (6543):
    if (parsed.hostname.startsWith('db.') && parsed.hostname.endsWith('.supabase.co')) {
      const projectRef = parsed.hostname.split('.')[1]
      const region = process.env.S3_REGION || 'eu-west-1'
      parsed.hostname = `aws-0-${region}.pooler.supabase.com`
      parsed.port = '6543'
      if (!parsed.username.includes('.')) {
        parsed.username = `${parsed.username}.${projectRef}`
      }
      parsed.searchParams.delete('sslmode')
      return parsed.toString()
    }

    // If using the Supabase pooler on port 5432 (Session Mode), switch to 6543 (Transaction Mode)
    // to prevent '(EMAXCONNSESSION) max clients reached in session mode' errors under serverless load:
    if (parsed.hostname.includes('.pooler.supabase.com') && (parsed.port === '5432' || !parsed.port)) {
      parsed.port = '6543'
      parsed.searchParams.delete('sslmode')
      return parsed.toString()
    }
  } catch {
    // If invalid URL structure, fallback to raw input
  }
  return rawUrl
}

const rawDbUrl =
  process.env.DATABASE_URL || process.env.DATABASE_URI || process.env.POSTGRES_URL || ''
const dbUrl = resolvePostgresUrl(rawDbUrl)
const isPostgres = dbUrl.startsWith('postgres://') || dbUrl.startsWith('postgresql://')
const sqliteUrl = dbUrl || `file:${path.resolve(process.cwd(), 'local.db')}`

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '- Student Journalism Publication Admin',
    },
    suppressHydrationWarning: true,
  },
  collections: [Users, Media, Authors, Categories, Articles],
  editor: lexicalEditor(),
  sharp,
  secret: process.env.PAYLOAD_SECRET || 'nouvress-dev-secret-key-32-characters-long!!',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  plugins: [
    ...(process.env.S3_BUCKET
      ? [
          s3Storage({
            collections: {
              media: true,
            },
            bucket: process.env.S3_BUCKET,
            config: {
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
              },
              region: process.env.S3_REGION || 'us-east-1',
              endpoint: process.env.S3_ENDPOINT,
              forcePathStyle: true,
            },
          }),
        ]
      : process.env.BLOB_READ_WRITE_TOKEN
      ? [
          vercelBlobStorage({
            enabled: true,
            collections: {
              media: true,
            },
            token: process.env.BLOB_READ_WRITE_TOKEN,
          }),
        ]
      : []),
  ],
  db: isPostgres
    ? postgresAdapter({
        pool: {
          connectionString: dbUrl,
          max: 4,
          idleTimeoutMillis: 5000,
          connectionTimeoutMillis: 5000,
        },
      })
    : sqliteAdapter({
        client: {
          url: sqliteUrl,
        },
      }),
})

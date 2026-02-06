import { S3Client } from '@aws-sdk/client-s3'
import dotenv from 'dotenv'

dotenv.config()

const r2AccountId = process.env.R2_ACCOUNT_ID
const r2AccessKeyId = process.env.R2_ACCESS_KEY_ID
const r2SecretAccessKey = process.env.R2_SECRET_ACCESS_KEY

if (!r2AccountId || !r2AccessKeyId || !r2SecretAccessKey) {
  console.warn('⚠️  Cloudflare R2 environment variables not configured')
}

export const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${r2AccountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: r2AccessKeyId || '',
    secretAccessKey: r2SecretAccessKey || '',
  },
})

export const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || 'novaynov-assets'
export const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL || ''

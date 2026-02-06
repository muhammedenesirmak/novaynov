import Iyzipay from 'iyzipay'
import dotenv from 'dotenv'

dotenv.config()

const iyzicoApiKey = process.env.IYZICO_API_KEY
const iyzicoSecretKey = process.env.IYZICO_SECRET_KEY
const iyzicoBaseUrl = process.env.IYZICO_BASE_URL

if (!iyzicoApiKey || !iyzicoSecretKey || !iyzicoBaseUrl) {
  console.warn('⚠️  iyzico environment variables not configured')
}

export const iyzipay = new Iyzipay({
  apiKey: iyzicoApiKey || '',
  secretKey: iyzicoSecretKey || '',
  uri: iyzicoBaseUrl || 'https://sandbox-api.iyzipay.com',
})

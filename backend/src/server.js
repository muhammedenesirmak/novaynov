import app from './app.js'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════╗
║                                      ║
║       🚀 NovaYnov API Server        ║
║                                      ║
║  Port: ${PORT}                       ║
║  Environment: ${process.env.NODE_ENV || 'development'}            ║
║  Time: ${new Date().toLocaleString('tr-TR')}   ║
║                                      ║
╚══════════════════════════════════════╝
  `)
})

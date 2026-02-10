import express from 'express'
import { Express } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from './routes/route'

const app:Express = express()

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(cookieParser())

app.use('/api',router)

export default app

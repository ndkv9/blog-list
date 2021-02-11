import express from 'express'
const app = express()

import config from './utils/config'
import logger from './utils/logger'
import cors from 'cors'
import middleware from './utils/middleware'
import blogRouter from './controllers/blogs'
import Blog from './models/blog'

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)

Blog.connect(config.MONGODB_URI)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app

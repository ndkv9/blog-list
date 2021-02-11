import express from 'express'
const app = express()

import config from './utils/config.js'
import logger from './utils/logger.js'
import cors from 'cors'
import middleware from './utils/middleware.js'
import blogRouter from './controllers/blogs.js'
import mongoose from 'mongoose'

mongoose
	.connect(config.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => {
		logger.info('connected to MongoDB')
	})
	.catch(error => {
		logger.error('error connecting to MongoDB:', error.message)
	})

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app

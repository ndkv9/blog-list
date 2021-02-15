const express = require('express')
const app = express()

const config = require('./utils/config.js')
const logger = require('./utils/logger.js')
const cors = require('cors')
const middleware = require('./utils/middleware.js')
const blogRouter = require('./controllers/blogs.js')
const mongoose = require('mongoose')

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

module.exports = app

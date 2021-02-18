const express = require('express')
const app = express()

require('express-async-errors')
const config = require('./utils/config.js')
const logger = require('./utils/logger.js')
const cors = require('cors')
const middleware = require('./utils/middleware.js')
const blogsRouter = require('./controllers/blogs.js')
const usersRouter = require('./controllers/users.js')
const mongoose = require('mongoose')
const helmet = require('helmet')

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
app.use(helmet())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app

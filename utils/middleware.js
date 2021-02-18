const logger = require('./logger.js')

const tokenExtractor = (req, res, next) => {
	const authorization = req.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		res.token = authorization.slice(7)
		console.log('token ne m', res.token)
	} else {
		res.token = null
	}

	next()
}

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
	logger.error(error)

	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return res.status(400).json({ error: error.message })
	} else if (error.name === 'JsonWebTokenError') {
		return res.status(400).json({ error: 'invalid token' })
	}

	next(error)
}

module.exports = { unknownEndpoint, errorHandler, tokenExtractor }

const dotenv = require('dotenv').config()

const PORT = process.env.PORT || 3001
let MONGODB_URI = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'test') {
	MONGODB_URI = process.env.TESTING_URI
}

module.exports = { PORT, MONGODB_URI }

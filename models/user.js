const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	name: String,
	passwordHash: String,
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
	transform: (doc, returnedObj) => {
		returnedObj.id = returnedObj._id.toString()
		delete returnedObj._id
		delete returnedObj.__v
	},
})

module.exports = mongoose.model('User', userSchema)

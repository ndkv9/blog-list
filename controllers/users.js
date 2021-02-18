const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (req, res) => {
	const users = await User.find({})
	res.json(users)
})

usersRouter.post('/', async (req, res) => {
	const body = req.body
	const passwordHash = await bcrypt.hash(body.password, 10)

	const user = new User({
		username: body.username,
		name: body.name,
		passwordHash,
	})

	const savedUser = await user.save()
	res.json(savedUser)
})

module.exports = usersRouter

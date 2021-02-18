const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (req, res) => {
	const users = await User.find({}).populate('blogs', {
		url: 1,
		title: 1,
		author: 1,
	})
	res.json(users)
})

usersRouter.post('/', async (req, res) => {
	const body = req.body

	if (!(body.username && body.password)) {
		return res.status(400).json({ errors: 'missing username or password' })
	}

	const userToCreate = await User.findOne({ username: body.username })
	if (userToCreate) {
		return res.status(400).json({ errors: 'username must be unique' })
	}

	if (body.password.length < 3) {
		return res
			.status(401)
			.json({ errors: 'password must be at least 3 characters' })
	}

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

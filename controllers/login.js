const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
	const body = req.body

	const user = await User.findOne({ username: body.username })

	const isAuth =
		user === null
			? false
			: await bcrypt.compare(body.password, user.passwordHash)

	if (!(user && isAuth)) {
		return res.status(401).json({ error: 'invalid username or password' })
	}

	const payload = {
		username: user.username,
		id: user._id,
	}

	const token = jwt.sign(payload, process.env.SECRET)

	res.status(200).json({ token, username: user.username, name: user.name })
})

module.exports = loginRouter

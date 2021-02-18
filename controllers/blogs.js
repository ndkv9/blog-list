const express = require('express')
const Blog = require('../models/blog.js')
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')
const blog = require('../models/blog.js')

const blogsRouter = express.Router()

blogsRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
	res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
	const decodedToken = jwt.verify(req.token, process.env.SECRET)

	if (!decodedToken.id) {
		return res.status(401).json({ error: 'invalid token' })
	}

	const user = await User.findById(decodedToken.id)

	const blog = new Blog({ ...req.body, user: user._id })

	blog.likes ? blog.likes : (blog.likes = 0)

	if (!blog.url || !blog.title) {
		res.status(400).json({ error: 'title or url missing!' })
	}
	const newBlog = await blog.save()
	user.blogs = user.blogs.concat(newBlog._id)
	await user.save()

	res.status(201).json(newBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
	const decodedToken = jwt.verify(req.token, process.env.SECRET)
	const blogToDelete = await Blog.findById(req.params.id)
	const user = await User.findById(decodedToken.id)

	if (!blogToDelete) {
		return res.status(404).json({ error: 'nonexisting blog' })
	}

	if (user._id.toString() === blogToDelete.user.toString()) {
		await blogToDelete.remove()
		user.blogs = user.blogs.filter(
			b => b.id.toString() !== req.params.id.toString()
		)
		await user.save()

		return res.status(204).end()
	}

	return res
		.status(400)
		.json({ error: 'cannot delete blog when you are not the creator' })
})

blogsRouter.put('/:id', async (req, res) => {
	const body = req.body
	const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, body, {
		new: true,
	})
	res.json(updatedBlog)
})

module.exports = blogsRouter

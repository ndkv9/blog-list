const express = require('express')
const blogsRouter = express.Router()
const Blog = require('../models/blog.js')
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
	res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
	const decodedToken = jwt.verify(req.token, process.env.SECRET)
	const blog = new Blog(req.body)

	if (!decodedToken.id) {
		return res.status(401).json({ error: 'invalid token' })
	}

	const user = await User.findById(decodedToken.id)

	blog.likes ? blog.likes : (blog.likes = 0)

	if (!blog.url || !blog.title) {
		res.status(400).json({ error: 'title or url missing!' })
	}
	blog.user = user
	const newBlog = await blog.save()
	user.blogs = user.blogs.concat(newBlog._id)
	await user.save()

	res.status(201).json(newBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
	const decodedToken = jwt.verify(req.token, process.env.SECRET)
	if (!req.token || !decodedToken.id) {
		return res.status(401).json({ error: 'token missing or invalid' })
	}

	const blog = await Blog.findById(req.params.id)
	const user = await User.findById(decodedToken.id)

	if (!blog) {
		return res.status(404).json({ error: 'nonexisting blog' })
	}

	if (blog.user.toString() !== user.id.toString()) {
		return response
			.status(401)
			.json({ error: 'only the creator can delete blogs' })
	}

	await blog.remove()
	user.blogs = user.blogs.filter(b => {
		return b.toString() !== req.params.id.toString()
	})
	await user.save()
	res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
	const body = req.body
	const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, body, {
		new: true,
	})
	res.json(updatedBlog)
})

module.exports = blogsRouter

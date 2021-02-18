const express = require('express')
const Blog = require('../models/blog.js')
const User = require('../models/user.js')

const blogsRouter = express.Router()

blogsRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({})
	res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
	const blog = new Blog(req.body)
	blog.likes ? blog.likes : (blog.likes = 0)

	if (!blog.url || !blog.title) {
		res.status(400).json({ error: 'title or url missing!' })
	}
	const newBlog = await blog.save()

	const user = await User.findById(blog.user)
	user.blogs = user.blogs.concat(newBlog._id)
	await user.save()

	res.status(201).json(newBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
	await Blog.findByIdAndRemove(req.params.id)
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

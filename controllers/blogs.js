const express = require('express')
const Blog = require('../models/blog.js')

const blogRouter = express.Router()

blogRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({})
	res.json(blogs)
})

blogRouter.post('/', async (req, res) => {
	const blog = new Blog(req.body)
	blog.likes ? blog.likes : (blog.likes = 0)

	if (!blog.url || !blog.title) {
		res.status(400).json({ error: 'title or url missing!' })
	}
	const newBlog = await blog.save()
	res.status(201).json(newBlog)
})

blogRouter.delete('/:id', async (req, res) => {
	await Blog.findByIdAndRemove(req.params.id)
	res.status(204).end()
})

module.exports = blogRouter

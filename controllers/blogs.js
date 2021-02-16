const express = require('express')
const Blog = require('../models/blog.js')

const blogRouter = express.Router()

blogRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({})
	res.json(blogs)
})

blogRouter.post('/', async (req, res) => {
	const blog = new Blog(req.body)
	const newBlog = await blog.save()
	res.status(201).json(newBlog)
})

module.exports = blogRouter

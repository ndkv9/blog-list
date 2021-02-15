const express = require('express')
const Blog = require('../models/blog.js')

const blogRouter = express.Router()

blogRouter.get('/', (req, res, next) => {
	Blog.find({})
		.then(blogs => res.json(blogs))
		.catch(error => next(error))
})

blogRouter.post('/', (req, res, next) => {
	const blog = new Blog(req.body)

	blog
		.save()
		.then(blog => res.status(201).json(blog))
		.catch(error => next(error))
})

module.exports = blogRouter

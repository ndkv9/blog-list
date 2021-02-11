import express from 'express'
import Blog from '../models/blog.js'

const blogRouter = express.Router()

blogRouter.get('/', (req, res, next) => {
	Blog.find({})
		.then(blogs => blogs.toJSON())
		.then(formattedBlogs => res.json(formattedBlogs))
		.catch(error => next(error))
})

blogRouter.post('/', (req, res, next) => {
	const blog = new Blog(req.body)

	blog
		.save()
		.then(blog => blog.toJSON())
		.then(formattedBlog => res.status(201).json(formattedBlog))
		.catch(error => next(error))
})

export default blogRouter

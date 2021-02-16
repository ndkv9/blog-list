const app = require('../app')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./api_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
	await Blog.deleteMany({})
	for (blog of helper.initialBlogs) {
		let blogObj = new Blog(blog)
		await blogObj.save()
	}
})

afterAll(() => mongoose.connection.close())

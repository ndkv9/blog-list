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

describe('blog list', () => {
	test('return all blog posts in JSON format', async () => {
		const result = await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)

		expect(result.body).toHaveLength(helper.initialBlogs.length)
	})

	test('names the unique property as id', async () => {
		const result = await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)

		expect(result.body[0].id).toBeDefined()
	})

	test('creates a new blog properly', async () => {
		const blogsAtStart = await helper.blogsInDB()
		console.log('start', blogsAtStart)

		const newBlog = {
			title: 'new blog',
			author: 'me',
			url: 'http://example.com',
			likes: 54,
		}
		const response = await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const blogsAtEnd = await helper.blogsInDB()
		expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)
		expect(blogsAtEnd.map(b => b.title)).toContain(newBlog.title)
	})
})

afterAll(() => mongoose.connection.close())

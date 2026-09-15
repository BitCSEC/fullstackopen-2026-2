const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const helper = require('../utils/list_helper')
const app = require('../app')

const api = supertest(app)

describe('testing blog api', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.blogs)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        assert.strictEqual(response.body.length, helper.blogs.length)
    })

    test('unique identifier is named id', async () => {
        const response = await api.get('/api/blogs')

        response.body.forEach(blog => {
            assert(Object.keys(blog).includes('id'))
        })
        assert.strictEqual([...new Set(response.body.map(b => b.id))].length, helper.blogs.length)
    })

    test('a new blog is saved correctly', async () => {
        await api
            .post('/api/blogs')
            .send(helper.listWithOneBlog[0])
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, helper.blogs.length + 1)

        const contents = response.body.map(blog => blog.title)
        assert(contents.includes('Nelly the pup absolutely loving life in the field! 🤣'))
    })

    test('blog with no likes defaults to zero likes', async () => {
        await api
            .post('/api/blogs')
            .send(helper.blogWithNoLikes)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        const zeroLikesBlog = response.body.filter(blog => blog.id === helper.blogWithNoLikes._id)[0]
        assert.strictEqual(zeroLikesBlog.likes, 0)
    })

    test('blog with no title gives 400 error', async () => {
        await api
            .post('/api/blogs')
            .send(helper.blogWithNoTitle)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('blog with no url gives 400 error', async () => {
        await api
            .post('/api/blogs')
            .send(helper.blogWithNoUrl)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    after(async () => {
        mongoose.connection.close()
    })
})

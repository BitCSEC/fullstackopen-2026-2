const { test, describe, before, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

describe('Testing blogs API', () => {
    let listWithOneBlog, initialBlogs, blogToDelete, noLikesBlog, noTitleBlog, noUrlBlog

    before(() => {
        blogToDelete = helper.blogToBeDeleted
        listWithOneBlog = helper.listWithOneBlog
        initialBlogs = [...helper.blogs, { ...blogToDelete }]
        noLikesBlog = {
            _id: '5a422aa71b54a676234d17f4',
            title: 'Knitting the Web: We Need Interlinkers!',
            author: 'Brennan Kenneth Brown',
            url: 'https://brennan.day/knitting-the-web-we-need-interlinkers/',
            __v: 0
        }
        noTitleBlog = {
            _id: '5a422aa71b54a676234d17f3',
            author: 'Brennan Kenneth Brown',
            url: 'https://brennan.day/knitting-the-web-we-need-interlinkers/',
            __v: 0
        }
        noUrlBlog = {
            _id: '5a422aa71b54a676234d17f3',
            title: 'Knitting the Web: We need Interlinkers!',
            author: 'Brennan Kenneth Brown',
            __v: 0
        }
    })

    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(initialBlogs)
    })

    describe('when there is initially some blogs saved', () => {
        test('all blogs are returned', async () => {
            const response = await api.get('/api/blogs')

            assert.strictEqual(response.body.length, initialBlogs.length)
        })

        test('the unique identifier is named id', async () => {
            const response = await api.get('/api/blogs')

            response.body.forEach(blog => {
                assert(Object.keys(blog).includes('id'))
            })
        })

        test('the ids are unique', async () => {
            const response = await api.get('/api/blogs')

            const ids = response.body.map(blog => blog.id)
            const uniqueIds = [...new Set(ids)]
            assert.strictEqual(uniqueIds.length, ids.length)
        })
    })

    describe('addition of a new blog', () => {

        test('succeeds with valid data', async () => {
            await api
                .post('/api/blogs')
                .send(listWithOneBlog[0])
                .expect(201)
                .expect('Content-Type', /application\/json/)

            let finalBlogs = await Blog.find({})
            finalBlogs = finalBlogs.map(blog => blog.toJSON())
            assert.strictEqual(finalBlogs.length, initialBlogs.length + 1)

            const titles = finalBlogs.map(blog => blog.title)
            assert(titles.includes(listWithOneBlog[0].title))
        })

        test('likes defaults to zero when missing', async () => {
            await api
                .post('/api/blogs')
                .send(noLikesBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            let addedBlog = await Blog.findById(noLikesBlog._id)
            addedBlog = addedBlog.toJSON()
            assert.strictEqual(addedBlog.likes, 0)
        })

        test('fails with status code 400 if data is invalid', async () => {
            await api
                .post('/api/blogs')
                .send(noTitleBlog)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            await api
                .post('/api/blogs')
                .send(noUrlBlog)
                .expect(400)
                .expect('Content-Type', /application\/json/)
        })
    })

    describe('deletion of a blog', () => {
        test('succeeds with status code 204 if id is valid', async () => {
            await api
                .delete(`/api/blogs/${blogToDelete._id}`)
                .expect(204)

            let finalBlogs = await Blog.find({})
            finalBlogs = finalBlogs.map(blog => blog.toJSON())
            assert.strictEqual(finalBlogs.length, initialBlogs.length - 1)
        })
    })

    describe('updating of a blog', () => {
        test('succeeds with status code 200 if data is valid', async () => {
            const blog = new Blog(noLikesBlog)
            await blog.save()

            await api
                .patch(`/api/blogs/${noLikesBlog._id}`)
                .send({ likes: +1 })
                .expect(200)
                .expect('Content-Type', /application\/json/)

            let updatedBlog = await Blog.findById(noLikesBlog._id)
            updatedBlog = updatedBlog.toJSON()
            assert.strictEqual(updatedBlog.likes, 1)
        })
    })

    after(async () => {
        await Blog.deleteMany({})
        await mongoose.connection.close()
    })
})

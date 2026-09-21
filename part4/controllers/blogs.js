const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response, next) => {
    const blogs = await Blog.find({})

    response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
    const body = request.body
    const user = request.user
    const blog = new Blog({
        ...body,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
    const user = request.user
    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() !== user._id.toString()) {
        return response.status(401).json({ error: 'invalid token' })
    }

    user.blogs = user.blogs.filter(blogId => blogId != request.params.id)
    user.save()
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.patch('/:id', async (request, response, next) => {
    await Blog.findByIdAndUpdate(request.params.id, {
        $set: { likes: request.body.likes }
    }, {
        runValidators: true
    })

    response.status(200).json({ message: 'successful update' })
})

module.exports = blogsRouter

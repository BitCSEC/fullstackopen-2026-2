const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response, next) => {
    const blogs = await Blog.find({})

    response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body)

    try {
        const allUsers = await User.find({})
        blog.user = allUsers[0]._id

        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
        
        allUsers[0].blogs = allUsers[0].blogs.concat(blog._id)
        allUsers[0].save()
    } catch (err) {
        response.status(400).json({ error: err })
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
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

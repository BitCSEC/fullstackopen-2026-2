const testingRouter = require('express').Router()
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')

testingRouter.post('/reset', async (request, response, next) => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    response.status(204).end()
})

testingRouter.post('/populate', async (request, response, next) => {
    const salt = await bcrypt.genSalt(10)

    const user = {
        _id: '6ae7e1d00f2382f586c9b9c8',
        username: 'annon',
        name: 'Cosme Fulanito',
        passwordHash: await bcrypt.hash('easy', salt)
    }
    
    const blogs = [
        {
            _id: '6ae7e1d00f2382f586c9b9b6',
            title: 'Título I',
            author: 'Autor Anonimo',
            url: 'http://example.com',
            likes: 5,
            user:'6ae7e1d00f2382f586c9b9c8' 
        },
        {
            _id: '6ae7e1fd7ae27cb3fba7f8a0',
            title: 'Título II',
            author: 'Autor Anonimo',
            url: 'http://example.com',
            likes: 10, 
            user: '6ae7e1d00f2382f586c9b9c8'
        },
        {
            _id: '6ae7e207ea9e6568b821f7ed',
            title: 'Título III',
            author: 'Autor Anonimo',
            url: 'http://example.com',
            likes: 1,
            user: '6ae7e1d00f2382f586c9b9c8'
        }
    ]
    
    await User.insertOne(user)
    await Blog.insertMany(blogs)

    response.status(200).json({ status: 'ok', message: 'Success' })
})

module.exports = testingRouter

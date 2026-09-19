const { test, before, beforeEach, after, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const app = require('../app')
const helper = require('../tests/test_helper')


const api = supertest(app)

describe('Testing users API', () => {
    let initialUsers, validNewUser, badPwd, badUsername, repeatedUsername

    before(() => {
        initialUsers = helper.users
        validNewUser = helper.newUser
        badPwd = helper.badPwdUser
        badUsername = helper.badUsernameUser
        repeatedUsername = helper.repeatedUsernameUser
    })

    beforeEach(async () => {
        await User.deleteMany({})
        await User.insertMany(initialUsers)
    })

    describe('when there is some users on the database', () => {
        test('all users are returned', async () => {
            const users = await api.get('/api/users')

            assert.strictEqual(users.body.length, initialUsers.length)
        })
    })

    describe('addition of a new user', () => {
        test('success with valid data', async () => {
            await api
                .post('/api/users')
                .send(validNewUser)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            let finalUsers = await User.find({})
            finalUsers = finalUsers.map(user => user.toJSON())
            assert.strictEqual(finalUsers.length, initialUsers.length + 1)

            let usernames = finalUsers.map(user => user.username)
            assert(usernames.includes(validNewUser.username))
        })

        test('fails with status code 400 when password is invalid', async () => {
            await api
                .post('/api/users')
                .send(badPwd)
                .expect(400)
                .expect('Content-Type', /application\/json/)
        })

        test('fails with status code 400 when username is invalid', async () => {
            await api
                .post('/api/users')
                .send(badUsername)
                .expect(400)
                .expect('Content-Type', /application\/json/)
        })

        test('fails with status code 400 on repeated username', async () => {
            await api
                .post('/api/users')
                .send(repeatedUsername)
                .expect(400)
                .expect('Content-Type', /application\/json/)
        })
    })

    after(async () => {
        await User.deleteMany({})
        await mongoose.connection.close()
    })
})

const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const { emptyList, listWithOneBlog, blogs } = require('../utils/bloglist')

describe('total likes', () => {
    test('of empty list is zero', () => {
        assert.strictEqual(listHelper.totalLikes(emptyList), 0)
    })

    test('when list has only one blog equals the likes of that', () => {
        assert.strictEqual(listHelper.totalLikes(listWithOneBlog), listWithOneBlog[0].likes)
    })

    test('of a blogger list is calculated right', () => {
        assert.strictEqual(listHelper.totalLikes(blogs), 36)
    })
})

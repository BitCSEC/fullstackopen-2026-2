const { test, describe } = require('node:test')
const assert = require('node:assert')
const helper = require('../utils/list_helper')
const bloglist = require('../tests/test_helper')

describe('total likes', () => {
    test('of empty list is zero', () => {
        assert.strictEqual(helper.totalLikes(bloglist.emptyList), 0)
    })

    test('when list has only one blog equals the likes of that', () => {
        assert.strictEqual(helper.totalLikes(bloglist.listWithOneBlog), bloglist.listWithOneBlog[0].likes)
    })

    test('of a blogger list is calculated right', () => {
        assert.strictEqual(helper.totalLikes(bloglist.blogs), 36)
    })
})

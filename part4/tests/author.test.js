const { test, describe } = require('node:test')
const assert = require('node:assert')
const helper = require('../utils/list_helper')
const bloglist = require('../tests/test_helper')

describe('most repeated author', () => {
    test('of an empty list is undefined', () => {
        assert.strictEqual(helper.mostBlogs(bloglist.emptyList), undefined)
    })
    test('when list has only one blog, the author of that blog', () => {
        assert.deepStrictEqual(helper.mostBlogs(bloglist.listWithOneBlog), { author: 'Kev Quirk', blogs: 1 })
    })
    test('of a blogger list is calculated right', () => {
        assert.deepStrictEqual(helper.mostBlogs(bloglist.blogs), { author: 'Robert C. Martin', blogs: 3 })
    })
})

describe('author with most likes', () => {
    test('of an empty list is undefined', () => {
        assert.strictEqual(helper.mostLikes(bloglist.emptyList), undefined)
    })
    test('when list has only one blog, the author of that blog', () => {
        assert.deepStrictEqual(helper.mostLikes(bloglist.listWithOneBlog), { author: 'Kev Quirk', likes: 5 })
    })
    test('of a blogger list is calculated right', () => {
        assert.deepStrictEqual(helper.mostLikes(bloglist.blogs), { author: 'Edsger W. Dijkstra', likes: 17 })
    })
})

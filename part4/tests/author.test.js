const { test, describe } = require('node:test')
const assert = require('node:assert')
const helper = require('../utils/list_helper')

describe('most repeated author', () => {
    test('of an empty list is undefined', () => {
        assert.strictEqual(helper.mostBlogs(helper.emptyList), undefined)
    })
    test('when list has only one blog, the author of that blog', () => {
        assert.deepStrictEqual(helper.mostBlogs(helper.listWithOneBlog), { author: 'Kev Quirk', blogs: 1 })
    })
    test('of a blogger list is calculated right', () => {
        assert.deepStrictEqual(helper.mostBlogs(helper.blogs), { author: 'Robert C. Martin', blogs: 3 })
    })
})

describe('author with most likes', () => {
    test('of an empty list is undefined', () => {
        assert.strictEqual(helper.mostLikes(helper.emptyList), undefined)
    })
    test('when list has only one blog, the author of that blog', () => {
        assert.deepStrictEqual(helper.mostLikes(helper.listWithOneBlog), { author: 'Kev Quirk', likes: 5 })
    })
    test('of a blogger list is calculated right', () => {
        assert.deepStrictEqual(helper.mostLikes(helper.blogs), { author: 'Edsger W. Dijkstra', likes: 17 })
    })
})

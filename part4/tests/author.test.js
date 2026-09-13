const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const { emptyList, listWithOneBlog, blogs } = require('../utils/bloglist')

describe('most repeated author', () => {
    test('of an empty list is undefined', () => {
        assert.strictEqual(listHelper.mostBlogs(emptyList), undefined)
    })
    test('when list has only one blog, the author of that blog', () => {
        assert.deepStrictEqual(listHelper.mostBlogs(listWithOneBlog), { author: 'Edsger W. Dijkstra', blogs: 1 })
    })
    test('of a blogger list is calculated right', () => {
        assert.deepStrictEqual(listHelper.mostBlogs(blogs), { author: 'Robert C. Martin', blogs: 3 })
    })
})

describe('author with most likes', () => {
    test('of an empty list is undefined', () => {
        assert.strictEqual(listHelper.mostLikes(emptyList), undefined)
    })
    test('when list has only one blog, the author of that blog', () => {
        assert.deepStrictEqual(listHelper.mostLikes(listWithOneBlog), { author: 'Edsger W. Dijkstra', likes: 5 })
    })
    test('of a blogger list is calculated right', () => {
        assert.deepStrictEqual(listHelper.mostLikes(blogs), { author: 'Edsger W. Dijkstra', likes: 17 })
    })
})

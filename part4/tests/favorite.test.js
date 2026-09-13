const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const { emptyList, listWithOneBlog, blogs } = require('../utils/bloglist')

describe('favorite blog', () => {
    test('of emtpy list is undefined', () => {
        assert.strictEqual(listHelper.favoriteBlog(emptyList), undefined)
    })

    test('when list has only one blog equals that blog', () => {
        result = listHelper.favoriteBlog(listWithOneBlog)

        assert.deepStrictEqual(result, listWithOneBlog[0])
    })
    test('of a blogger list is calculated right', () => {
        result = listHelper.favoriteBlog(blogs)

        assert.deepStrictEqual(result, blogs[2])
    })
})

const { test, describe } = require('node:test')
const assert = require('node:assert')
const helper = require('../utils/list_helper')
const bloglist = require('../tests/test_helper')

describe('favorite blog', () => {
    test('of emtpy list is undefined', () => {
        assert.strictEqual(helper.favoriteBlog(bloglist.emptyList), undefined)
    })

    test('when list has only one blog equals that blog', () => {
        result = helper.favoriteBlog(bloglist.listWithOneBlog)

        assert.deepStrictEqual(result, bloglist.listWithOneBlog[0])
    })
    test('of a blogger list is calculated right', () => {
        result = helper.favoriteBlog(bloglist.blogs)

        assert.deepStrictEqual(result, bloglist.blogs[2])
    })
})

const { test, describe } = require('node:test')
const assert = require('node:assert')
const helper = require('../utils/list_helper')

describe('favorite blog', () => {
    test('of emtpy list is undefined', () => {
        assert.strictEqual(helper.favoriteBlog(helper.emptyList), undefined)
    })

    test('when list has only one blog equals that blog', () => {
        result = helper.favoriteBlog(helper.listWithOneBlog)

        assert.deepStrictEqual(result, helper.listWithOneBlog[0])
    })
    test('of a blogger list is calculated right', () => {
        result = helper.favoriteBlog(helper.blogs)

        assert.deepStrictEqual(result, helper.blogs[2])
    })
})

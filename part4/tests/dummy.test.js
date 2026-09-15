const { test, describe } = require('node:test')
const assert = require('node:assert')
const helper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = helper.dummy(blogs)
    assert.strictEqual(result, 1)
})

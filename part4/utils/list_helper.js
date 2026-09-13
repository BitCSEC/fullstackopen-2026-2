var _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length <= 0) {
        return undefined
    }

    currentFavorite = blogs[0]
    blogs.forEach(blog => {
        if (blog.likes >= currentFavorite.likes) {
            currentFavorite = blog
        }
    })

    return currentFavorite
}

const mostBlogs = (blogs) => {
    if (blogs.length <= 0) {
        return undefined
    }

    result = _.maxBy(_.toPairs(_.countBy(blogs, blog => blog.author)), author => author[1])

    return { author: result[0], blogs: result[1] }
}

const mostLikes = (blogs) => {
    if (blogs.length <= 0) {
        return undefined
    }

    const result = _.maxBy(_.toPairs(_.forEach(_.groupBy(blogs, blog => blog.author), (value, key, collection) => collection[key] = _.sumBy(value, blog => blog.likes))), author => author[1])

    return { author: result[0], likes: result[1] }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}

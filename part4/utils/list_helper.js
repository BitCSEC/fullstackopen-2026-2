var _ = require('lodash')

const emptyList = []

const blogWithNoTitle = {
    _id: '5a422aa71b54a676234d17f3',
    author: 'Brennan Kenneth Brown',
    url: 'https://brennan.day/knitting-the-web-we-need-interlinkers/',
    __v: 0
}

const blogWithNoUrl = {
    _id: '5a422aa71b54a676234d17f4',
    title: 'Knitting the Web: We Need Interlinkers!',
    author: 'Brennan Kenneth Brown',
    __v: 0
}

const blogWithNoLikes = {
    _id: '5a422aa71b54a676234d17f5',
    title: 'Knitting the Web: We Need Interlinkers!',
    author: 'Brennan Kenneth Brown',
    url: 'https://brennan.day/knitting-the-web-we-need-interlinkers/',
    __v: 0
}

const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f6',
        title: 'Nelly the pup absolutely loving life in the field! 🤣',
        author: 'Kev Quirk',
        url: 'https://kevquirk.com/2026-09-13-1035',
        likes: 5,
        __v: 0
    }
]

const blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

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
    emptyList,
    blogWithNoTitle,
    blogWithNoUrl,
    blogWithNoLikes,
    listWithOneBlog,
    blogs,
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}

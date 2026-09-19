const newUser = {
    username: 'Nano',
    name: 'Fernando Díaz',
    password: 'LeondeCollao'
}

const badPwdUser = {
    username: 'badPwd',
    name: 'Malacón Traseña',
    password: 'ho'
}

const badUsernameUser = {
    username: 'bu',
    name: 'Malu Suario',
    password: 'bien'
}

const repeatedUsernameUser = {
    username: 'hellas',
    name: 'Arto II Hellas',
    password: 'repetido'
}

const users = [
    {
        username: 'hellas',
        name: 'Arto Hellas',
        password: 'sekret69'
    },
    {
        username: 'mluukai',
        name: 'Matti Lukkainen',
        password: 'salainen'
    },
    {
        username: 'admin',
        name: 'Admi Nistrador',
        password: 'admin'
    }
]

const blogToBeDeleted = {
    _id: '5a422aa71b54a676234d17f5',
    title: 'Security versus Privacy',
    author: 'Loren Stephens',
    url: 'https://ldstephens.net/posts/security-versus-privacy/',
    likes: 0,
    __v: 0
}

const emptyList = []

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
    },
]

module.exports = {
    badPwdUser,
    badUsernameUser,
    repeatedUsernameUser,
    newUser,
    users,
    blogToBeDeleted,
    emptyList,
    listWithOneBlog,
    blogs
}

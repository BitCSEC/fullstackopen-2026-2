import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const loggedUser = JSON.parse(loggedUserJSON)
            setUser(loggedUser)
            blogService.setToken(loggedUser.token)
        }
    }, [])


    const handleLogin = async event => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password })
            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch {
            console.log('wrong credentials')
        }
    }

    const handleLogout = () => {
        setUser(null)
        window.localStorage.removeItem('loggedBlogappUser')
    }

    const handleCreateBlog = async event => {
        event.preventDefault()
        const newBlogObject = {
            title,
            author,
            url
        }
        
        const newBlog = await blogService.create(newBlogObject)
        setBlogs(blogs.concat(newBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    if (!user) {
        return (
            <div>
                <LoginForm
                    username={username}
                    password={password}
                    handlers={[handleLogin, setUsername, setPassword]}
                />
            </div>
        )
    }

    return (
        <div>
            <h2>blogs</h2>
            <CreateBlogForm
                title={title}
                author={author}
                url={url}
                handlers={[handleCreateBlog, setTitle, setAuthor, setUrl]}
            />
            <p>
                {user.name} logged in
                <button type='button' onClick={handleLogout}>log out</button>
            </p>
            {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
        </div>
    )

}

export default App

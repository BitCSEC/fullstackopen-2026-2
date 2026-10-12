import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
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
    const [message, setMessage] = useState(null)
    const [messageType, setMessageType] = useState(null)

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
            setMessage('wrong credentials')
            setMessageType("error")
            setTimeout(() => {
                setMessage(null)
                setMessageType(null)
            }, 5000)
        }
    }

    const handleLogout = () => {
        setUser(null)
        window.localStorage.removeItem('loggedBlogappUser')
    }

    const handleCreateBlog = async event => {
        event.preventDefault()
        try {
            const newBlogObject = {
                title,
                author,
                url
            }

            const newBlog = await blogService.create(newBlogObject)
            setBlogs(blogs.concat(newBlog))
            setMessage(`${newBlogObject.title} has been created`)
            setMessageType("success")
            setTimeout(() => {
                setMessage(null)
                setMessageType(null)
            }, 5000)
            setTitle('')
            setAuthor('')
            setUrl('')
        } catch (error) {
            setMessage(error.response.data.error)
            setMessageType("error")
            setTimeout(() => {
                setMessage(null)
                setMessageType(null)
            }, 5000)
        }
    }

    if (!user) {
        return (
            <div>
                <Notification message={message} type={messageType} />
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
            <Notification message={message} type={messageType} />
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

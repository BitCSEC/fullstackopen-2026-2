import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
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
            setMessageType('error')
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

    const addBlog = async (blogObject) => {
        try {
            const newBlog = await blogService.create(blogObject)
            setBlogs(blogs.concat(newBlog))
            setMessage(`${blogObject.title} has been created`)
            setMessageType('success')
            setTimeout(() => {
                setMessage(null)
                setMessageType(null)
            }, 5000)
        } catch (error) {
            setMessage(error.response.data.error)
            setMessageType('error')
            setTimeout(() => {
                setMessage(null)
                setMessageType(null)
            }, 5000)
        }
    }

    const deleteBlog = async (blogObject) => {
        if (window.confirm(`Remove blog ${blogObject.title}`)) {
            try {
                const response = await blogService.deleteBlog(blogObject)
                setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
                console.log(response)
            }
            catch (error) {
                console.log(error)
            }
        }
    }

    const displayDeleteButton = blogObject => blogObject.user.username === user.username


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

    const sortedBlogs = blogs.toSorted(
        (a, b) => a.likes > b.likes ? -1 : a.likes < b.likes ? 1 : 0
    )

    return (
        <div>
            <Notification message={message} type={messageType} />
            <h2>blogs</h2>
            <p>
                {user.name} logged in
                <button type='button' onClick={handleLogout}>log out</button>
            </p>
            <Togglable showLabel="create new blog">
                <CreateBlogForm createBlog={addBlog} />
            </Togglable>
            {sortedBlogs.map(blog => <Blog key={blog.id} blog={blog} removeBlog={deleteBlog} displayDelete={displayDeleteButton} />)}
        </div>
    )

}

export default App

import { useState, useEffect } from 'react'
import { Link, Routes, Route, useNavigate, useMatch } from 'react-router-dom'

import blogService from './services/blogs'
import loginService from './services/login'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import BlogList from './components/BlogList'


const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)
    const [messageType, setMessageType] = useState(null)

    const navigate = useNavigate()

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
            navigate('/')
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
        navigate('/')
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
            return true
        } catch (error) {
            setMessage(error.response.data.error)
            setMessageType('error')
            setTimeout(() => {
                setMessage(null)
                setMessageType(null)
            }, 5000)
            return false
        }
    }

    const deleteBlog = async (blogObject) => {
        if (window.confirm(`Remove blog ${blogObject.title}`)) {
            try {
                await blogService.deleteBlog(blogObject)
                setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
            }
            catch (error) {
                console.log(error)
            }
        }
    }

    const updateLikes = async (blog) => {
        try {
            const response = await blogService.updateLikes(blog)
            setBlogs(blogs.map(blog => blog.id != response.id ? blog : response))
            return response
        } catch (error) {
            console.log(error)
        }
    }

    const displayButton = blogObject => {
        if (!user) {
            return false
        }
        return blogObject.user.username === user.username
    }

    const sortedBlogs = blogs.toSorted(
        (a, b) => a.likes > b.likes ? -1 : a.likes < b.likes ? 1 : 0
    )

    const match = useMatch('/:id')
    const blog = match ? blogs.find(blog => blog.id === match.params.id) : null

    return (
        <div>
            <div>
                <Link style={{ padding: 5 }} to='/'>blogs</Link>
                {!user && <Link style={{ padding: 5 }} to='/login'>login</Link>}
                {user && <Link style={{ padding: 5 }} to='/create'>new blog</Link>}
                {user && <button type='button' onClick={handleLogout}>log out</button>}
            </div>
            <Notification message={message} type={messageType} />
            <Routes>
                <Route path='/' element={<BlogList blogs={sortedBlogs} />} />
                <Route
                    path='/login'
                    element={<LoginForm
                        username={username}
                        password={password}
                        handlers={[handleLogin, setUsername, setPassword]}
                    />}
                />
                <Route
                    path='/create'
                    element={<CreateBlogForm createBlog={addBlog} />}
                />
                <Route
                    path='/:id'
                    element={<Blog
                        blog={blog}
                        removeBlog={deleteBlog}
                        displayButton={displayButton}
                        updateLikes={updateLikes}
                    />}
                />
            </Routes>
        </div>
    )
}

export default App

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Blog = ({ blog, removeBlog, displayDelete, updateLikes }) => {
    const [visible, setVisible] = useState(false)
    const [currentBlog, setCurrentBlog] = useState(blog)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const navigate = useNavigate()

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const addLike = async event => {
        event.preventDefault()
        const response = await updateLikes(currentBlog)
        setCurrentBlog(response)
    }

    const deleteBlog = async event => {
        event.preventDefault()
        await removeBlog(blog)
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div>
            <h2>{currentBlog.title} - {currentBlog.author}</h2>
            <a href={currentBlog.url} target='_blank' rel='noopener noreferrer'>{currentBlog.url}</a><br />
            likes {currentBlog.likes}&nbsp;
            {displayDelete(currentBlog) && <button onClick={addLike}>like</button>}<br />
            Added by {currentBlog.user.name}<br />
            {displayDelete(currentBlog) && <button onClick={deleteBlog}>delete</button>}
        </div>
    )
}

export default Blog

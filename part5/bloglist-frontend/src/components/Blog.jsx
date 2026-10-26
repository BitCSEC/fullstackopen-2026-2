import { useState } from 'react'

const Blog = ({ blog, removeBlog, displayDelete, updateLikes }) => {
    const [visible, setVisible] = useState(false)
    const [currentBlog, setCurrentBlog] = useState(blog)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

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
        <div style={blogStyle}>
            <div>
                {currentBlog.title} {currentBlog.author}&nbsp;
                <button style={hideWhenVisible} onClick={toggleVisibility}>view</button>
                <button style={showWhenVisible} onClick={toggleVisibility}>hide</button>
                <div className='extra'style={showWhenVisible}>
                    {currentBlog.url}<br />
                    likes {currentBlog.likes} <button onClick={addLike}>like</button><br />
                    {currentBlog.user.name}<br />
                    {displayDelete(blog) && <button onClick={deleteBlog}>delete</button> }
                </div>
            </div>
        </div>
    )
}

export default Blog

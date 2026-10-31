// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'

const Blog = ({ blog, removeBlog, displayButton, updateLikes }) => {
    // const [currentBlog, setCurrentBlog] = useState(blog)

    // const hideWhenVisible = { display: visible ? 'none' : '' }
    // const showWhenVisible = { display: visible ? '' : 'none' }

    // const navigate = useNavigate()

    // const toggleVisibility = () => {
    //     setVisible(!visible)
    // }

    const addLike = async event => {
        event.preventDefault()
        await updateLikes(blog)
        // const response = await updateLikes(currentBlog)
        // setCurrentBlog(response)
    }

    const deleteBlog = async event => {
        event.preventDefault()
        await removeBlog(blog)
    }

    // const blogStyle = {
    //     paddingTop: 10,
    //     paddingLeft: 2,
    //     border: 'solid',
    //     borderWidth: 1,
    //     marginBottom: 5
    // }

    return (
        <div>
            <h2>{blog.title} - {blog.author}</h2>
            <a href={blog.url} target='_blank' rel='noopener noreferrer'>{blog.url}</a><br />
            likes {blog.likes}&nbsp;
            {displayButton(blog) && <button onClick={addLike}>like</button>}<br />
            Added by {blog.user.name}<br />
            {displayButton(blog) && <button onClick={deleteBlog}>delete</button>} 
        </div>
    )
}

export default Blog

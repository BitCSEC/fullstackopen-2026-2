const Blog = ({ blog, removeBlog, displayButton, updateLikes }) => {
    const addLike = async event => {
        event.preventDefault()
        await updateLikes(blog)
    }

    const deleteBlog = async event => {
        event.preventDefault()
        await removeBlog(blog)
    }

    if (!blog) {
        return null
    }

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

import Blog from './Blog'

const BlogList = ({ blogs, removeBlog, displayDelete, updateLikes }) => {
    return (
        <div>
            <h2>blogs</h2>
            {blogs.map(blog => <Blog key={blog.id} blog={blog} removeBlog={removeBlog} displayDelete={displayDelete} updateLikes={updateLikes} />)}
        </div>
    )

}

export default BlogList

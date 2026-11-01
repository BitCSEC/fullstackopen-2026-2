import { Stack, Card, CardContent, Button, Typography, Link } from '@mui/material'

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
        <Card sx={{ marginTop: 5, mx: 'auto' }}>
            <CardContent>
                <Typography variant='h4' component='h2'>
                    {blog.title} - {blog.author}
                </Typography>
                <Link href={blog.url} target='_blank' rel='noopener noreferrer'>{blog.url}</Link>
                <Typography variant='body1'>
                    likes {blog.likes}
                </Typography>
                <Typography variant='body2'>
                    Added by {blog.user.name}
                </Typography>
                <Stack direction='row' spacing={2}>
                    {displayButton(blog, true) && <Button variant='outlined' onClick={addLike}>like</Button>}
                    {displayButton(blog) && <Button variant='contained' color='error' onClick={deleteBlog}>delete</Button>}
                </Stack>
            </CardContent>
        </Card>
    )
}

export default Blog

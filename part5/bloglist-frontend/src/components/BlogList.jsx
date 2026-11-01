import { Card, CardContent, List, ListItem, ListItemButton, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {
    return (
        <Card sx={{ marginTop: 5, mx: 'auto' }}>
            <CardContent>
                <Typography variant='h4' component='h2'>
                    blogs
                </Typography>
                <List>
                    {blogs.map(blog => (
                        <ListItem key={blog.id}>
                            <ListItemButton sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider' }} component={Link} to={`/${blog.id}`}>
                                <Typography>
                                    {blog.title} by {blog.author}
                                </Typography>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    )

}

export default BlogList

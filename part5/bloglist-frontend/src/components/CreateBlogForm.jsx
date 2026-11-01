import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { TextField, Button, Typography, CardContent, Card } from '@mui/material'

const CreateBlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const navigate = useNavigate()

    const addBlog = async (event) => {
        event.preventDefault()
        const isSucces = await createBlog({
            title,
            author,
            url
        })
        if (isSucces) {
            navigate('/')
        }
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <Card sx={{ marginTop: 5, mx: 'auto' }}>
            <CardContent>
                <Typography variant='h4' component='h2'>
                    create new
                </Typography>
                <form onSubmit={addBlog}>
                    <div>
                        <TextField
                            label="title"
                            value={title}
                            onChange={({ target }) => setTitle(target.value)}
                        />
                    </div>
                    <div>
                        <TextField
                            label="author"
                            value={author}
                            onChange={({ target }) => setAuthor(target.value)}
                        />
                    </div>
                    <div>
                        <TextField
                            label="url"
                            value={url}
                            onChange={({ target }) => setUrl(target.value)}
                        />
                    </div>
                    <div>
                        <Button type='submit' variant='contained' style={{ marginTop: 10 }}>create</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default CreateBlogForm
